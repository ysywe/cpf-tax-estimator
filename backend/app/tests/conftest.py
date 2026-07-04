import pytest
import pytest_asyncio
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from testcontainers.postgres import PostgresContainer

from app.database import Base
from app.scripts.seed import seed_data


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