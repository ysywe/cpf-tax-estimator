from datetime import date
from decimal import Decimal, ROUND_HALF_UP, ROUND_DOWN

from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.cpf_repo import get_cpf_record, get_alloc_record, get_wage_ceiling_record
from app.utils.utils import get_cpf_age_group

async def calculate_cpf_contribution(
    db: AsyncSession,
    monthly_income: Decimal,
    additional_income: Decimal,
    age_grp: str,
    citizenship: str,
    income_date: date
    ) -> dict:
    contrib_record = await get_cpf_record(db, age_grp, citizenship, income_date)
    wage_ceiling_data = await get_wage_ceiling_record(db, income_date)

    ow_ceiling, aw_ceiling = wage_ceiling_data.ow_ceiling, wage_ceiling_data.aw_ceiling

    capped_ow = min(monthly_income, ow_ceiling) 
    capped_annual_ow = capped_ow * 12

    add_wage_ceiling = aw_ceiling - capped_annual_ow
    capped_add_wage = min(additional_income, add_wage_ceiling)

    employer_rate, employee_rate = contrib_record.employer_rate, contrib_record.employee_rate
    total_rate = contrib_record.total_rate

    # Monthly contribution share
    monthly_total_contrib = (capped_ow * total_rate).quantize(Decimal("1."), rounding=ROUND_HALF_UP)
    monthly_employee_share = (capped_ow * employee_rate).quantize(Decimal("1."), rounding=ROUND_DOWN)
    monthly_employer_share = monthly_total_contrib - monthly_employee_share

    # Anuual contribution share
    annual_total_contrib = (
        (capped_annual_ow * total_rate).quantize(Decimal("1."), rounding=ROUND_HALF_UP) +
        (capped_add_wage * total_rate).quantize(Decimal("1."), rounding=ROUND_HALF_UP)
    )
    annual_employee_share = (
        (capped_annual_ow * employee_rate).quantize(Decimal("1."), rounding=ROUND_DOWN) +
        (capped_add_wage * employee_rate).quantize(Decimal("1."), rounding=ROUND_DOWN)
    )
    annual_employer_share  = annual_total_contrib - annual_employee_share

    return {
        "monthly_summary": {
            "employee_share": monthly_employee_share,
            "employer_share": monthly_employer_share,
        },
        "annual_summary": {
            "gross_income": monthly_income * 12 + additional_income,
            "employee_share": annual_employee_share,
            "employer_share": annual_employer_share,
            "total_contribution": annual_total_contrib,
            "cpf_liable_wage": capped_annual_ow,
            "cpf_liable_bonus": capped_add_wage
        },
        "cpf_rates": {
            "employee_rate": employee_rate,
            "employer_rate": employer_rate,
            "total_rate": employee_rate + employer_rate
        },
        "age_group": age_grp
    }

async def calculate_cpf_allocation(
    db: AsyncSession,
    total_contribution: Decimal,
    age_grp: str,
    income_date: date
    ) -> dict:
    alloc_record = await get_alloc_record(db, age_grp, income_date)
    oa_rate, sa_rate, ma_rate, ra_rate = (
        alloc_record.oa_rate,
        alloc_record.sa_rate,
        alloc_record.ma_rate,
        alloc_record.ra_rate,
    )

    oa_amount = (total_contribution * oa_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    sa_amount = (total_contribution * sa_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    ma_amount = (total_contribution * ma_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    ra_amount = (total_contribution * ra_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

    return {
        "ordinary_account": {"amount": oa_amount, "rate": oa_rate},
        "special_account": {"amount": sa_amount, "rate": sa_rate},
        "medisave_account": {"amount": ma_amount, "rate": ma_rate},
        "retirement_account": {"amount": ra_amount, "rate": ra_rate}
    }

async def get_cpf_breakdown(
    db: AsyncSession,
    monthly_income: Decimal,
    additional_income: Decimal,
    age: int,
    citizenship: str,
    income_date: date
    ) -> dict:
    contrib_age_grp = get_cpf_age_group(age, citizenship)
    alloc_age_grp = get_cpf_age_group(age, None)

    contrib_data = await calculate_cpf_contribution(
        db, 
        monthly_income, 
        additional_income, 
        contrib_age_grp, 
        citizenship, 
        income_date
    )
    total_contrib = contrib_data["annual_summary"]["total_contribution"]
    alloc_data = await calculate_cpf_allocation(
        db, 
        total_contrib, 
        alloc_age_grp, 
        income_date
    )

    return {
        "contribution_data": contrib_data,
        "allocation_data": alloc_data
    }