from datetime import date
from decimal import Decimal

from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.tax_repo import get_tax_bracket
from app.services.cpf_service import get_cpf_breakdown

async def get_chargeable_income(
    db: AsyncSession, 
    monthly_income: Decimal,
    additional_income: Decimal,
    age: int,
    citizenship: str,
    income_date: date
    ) -> Decimal:
    cpf_data = await get_cpf_breakdown(
        db, 
        monthly_income, 
        additional_income, 
        age, 
        citizenship, 
        income_date
    )
    annual_cpf_data = cpf_data["contribution_data"]["annual_summary"]

    gross_annual_income = annual_cpf_data["gross_income"]
    employee_cpf_relief = annual_cpf_data["employee_share"]
    chargeable_income = gross_annual_income - employee_cpf_relief

    return chargeable_income

async def get_tax_breakdown(
    db: AsyncSession,
    monthly_income: Decimal,
    additional_income: Decimal,
    age: int,
    citizenship: str,
    income_date: date
    ) -> dict:
    chargeable_income = await get_chargeable_income(
        db, 
        monthly_income, 
        additional_income, 
        age, 
        citizenship, 
        income_date
    )

    tax_bracket = await get_tax_bracket(db, chargeable_income, income_date)
    tax_rate = tax_bracket.tax_rate / Decimal("100.0")
    excess_income = chargeable_income - tax_bracket.min_income
    excess_tax = excess_income * tax_rate

    total_tax_payable = (tax_bracket.tax_payable + excess_tax).quantize(Decimal("0.01"))

    return {
        "chargeable_income": chargeable_income,
        "min_income": tax_bracket.min_income,
        "excess_income": excess_income,
        "tax_rate": tax_rate,
        "excess_tax": excess_tax,
        "tax_payable": tax_bracket.tax_payable,
        "total_tax_payable": total_tax_payable,
        "effective_tax_rate": (total_tax_payable / chargeable_income)
        .quantize(Decimal("0.01")) if chargeable_income > 0 else Decimal("0.0")
    }