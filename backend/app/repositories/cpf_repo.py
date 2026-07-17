from datetime import date

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.models.cpf_contribution import CPFContribution
from app.models.cpf_allocation import CPFAllocation
from app.models.wage_ceiling import WageCeiling

async def get_cpf_record(
    db: AsyncSession,
    age_grp: str,
    citizenship,
    income_date: date,
) -> CPFContribution:
    effec_from = date(income_date.year, 1, 1)
    return await db.scalar(
        select(CPFContribution)
        .where(CPFContribution.citizenship == citizenship)
        .where(CPFContribution.age_grp == age_grp)
        .where(CPFContribution.effective_from <= effec_from)
        .order_by(desc(CPFContribution.effective_from))
        .limit(1)
    )

async def get_alloc_record(
    db: AsyncSession,
    age_grp: str,
    income_date: date,
) -> CPFAllocation:
    effec_from = date(income_date.year, 1, 1)
    return await db.scalar(
        select(CPFAllocation)
        .where(CPFAllocation.age_grp == age_grp)
        .where(CPFAllocation.effective_from <= effec_from)
        .order_by(desc(CPFAllocation.effective_from))
        .limit(1)
    )

async def get_wage_ceiling_record(db: AsyncSession, income_date: date) -> WageCeiling:
    effec_from = date(income_date.year, 1, 1)
    return await db.scalar(
        select(WageCeiling)
        .where(WageCeiling.effective_from <= effec_from)
        .order_by(desc(WageCeiling.effective_from))
        .limit(1)
    )