from datetime import date

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.models.cpf_contribution import CPFContribution
from app.models.cpf_allocation import CPFAllocation
from app.models.wage_ceiling import WageCeiling

async def get_rate(
    db: AsyncSession,
    model: CPFContribution | CPFAllocation,
    age_grp: str,
    income_date: date
) -> CPFContribution | CPFAllocation:
    
    effec_from = date(income_date.year, 1, 1)
    return await db.scalar(
        select(model)
        .where(model.age_grp == age_grp)
        .where(model.effective_from <= effec_from)
        .order_by(desc(model.effective_from))
        .limit(1)
    )

async def get_wage_ceiling(db: AsyncSession, income_date: date) -> WageCeiling:
    effec_from = date(income_date.year, 1, 1)
    return await db.scalar(
        select(WageCeiling)
        .where(WageCeiling.effective_from <= effec_from)
        .order_by(desc(WageCeiling.effective_from))
        .limit(1)
    )