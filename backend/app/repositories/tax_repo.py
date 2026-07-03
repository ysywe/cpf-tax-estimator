from datetime import date
from decimal import Decimal

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.models.tax_rate import TaxRate

async def get_tax_bracket(db: AsyncSession, chargeable_income: Decimal, income_date: date) -> TaxRate:
    return await db.scalar(
        select(TaxRate)
        .where(TaxRate.effective_from <= income_date)
        .where(TaxRate.min_income <= chargeable_income)
        .where(
            or_(
                TaxRate.max_income.is_(None),
                TaxRate.max_income > chargeable_income
            )
        )
        .order_by(TaxRate.effective_from.desc())
        .limit(1)
    )