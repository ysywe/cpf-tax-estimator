from typing import AsyncGenerator

import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from testcontainers.postgres import PostgresContainer
from httpx import AsyncClient, ASGITransport

from app.database import Base, get_db
from app.scripts.seed import seed_data
from app.main import app

@pytest.fixture(scope="session")
def postgres_container():

    with PostgresContainer(
        "postgres:16-alpine",
        driver="asyncpg",
    ) as postgres:

        yield postgres

@pytest_asyncio.fixture(scope="session")
async def db_engine(postgres_container):

    engine = create_async_engine(
        postgres_container.get_connection_url(),
        echo=False,
    )

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    Session = async_sessionmaker(
        engine,
        expire_on_commit=False,
        class_=AsyncSession,
    )

    async with Session() as session:
        await seed_data(session)

    yield engine

    await engine.dispose()

@pytest_asyncio.fixture
async def db_session(
    db_engine,
) -> AsyncGenerator[AsyncSession, None]:

    connection = await db_engine.connect()
    transaction = await connection.begin()

    Session = async_sessionmaker(
        bind=connection,
        expire_on_commit=False,
        class_=AsyncSession,
        join_transaction_mode="create_savepoint",
    )

    async with Session() as session:
        yield session

    await transaction.rollback()
    await connection.close()

@pytest_asyncio.fixture
async def async_client(db_session):

    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as client:
        yield client

    app.dependency_overrides.clear()