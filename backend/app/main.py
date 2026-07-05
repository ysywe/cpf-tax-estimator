from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import create_tables
from app.routers.calculator import calculator_router

@asynccontextmanager
async def lifespan(app):
    await create_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(calculator_router)