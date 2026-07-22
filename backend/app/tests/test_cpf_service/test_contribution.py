import pytest
from datetime import date
from decimal import Decimal

from app.services.cpf_service import calculate_cpf_contribution

pytestmark = pytest.mark.asyncio

# Zero ordinary and additional wages
async def test_cpf_no_aw(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("0.00"),
        additional_income=Decimal("0.00"),
        age_grp="35 years & below",
        citizenship="SC",
        income_date=date(2026, 1, 1)
    )
    monthly = result["monthly_summary"]
    annual = result["annual_summary"]

    assert monthly["employee_share"] == Decimal("0")
    assert monthly["employer_share"] == Decimal("0")

    assert annual["gross_income"] == Decimal("0.00")
    assert annual["total_contribution"] == Decimal("0.00") 
    assert annual["cpf_liable_wage"] == Decimal("0.00")
    assert annual["cpf_liable_bonus"] == Decimal("0.00")

# Below OW & AW ceilings
async def test_cpf_below_ow_and_aw_ceiling(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("4000.00"),
        additional_income=Decimal("5000.00"),
        age_grp="35 years & below",
        citizenship="SC",
        income_date=date(2026, 1, 1)
    )
    monthly = result["monthly_summary"]
    annual = result["annual_summary"]

    assert monthly["employee_share"] == Decimal("800.00")
    assert monthly["employer_share"] == Decimal("680.00")

    assert annual["gross_income"] == Decimal("53000.00")
    assert annual["cpf_liable_wage"] == Decimal("48000.00")
    assert annual["cpf_liable_bonus"] == Decimal("5000.00")

# Ordinary wage exceeds OW ceiling
async def test_cpf_above_ow_ceiling(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("10000.00"),
        additional_income=Decimal("0.00"),
        age_grp="35 years & below",
        citizenship="SC",
        income_date=date(2026, 1, 1)
    )
    monthly = result["monthly_summary"]
    annual = result["annual_summary"]

    assert monthly["employee_share"] == Decimal("1600.00")
    assert monthly["employer_share"] == Decimal("1360.00")

    assert annual["cpf_liable_wage"] == Decimal("96000.00")
    assert annual["cpf_liable_bonus"] == Decimal("0.00")

# Additional wage exceeds AW ceiling
async def test_cpf_above_aw_ceiling(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("9000.00"),
        additional_income=Decimal("50000.00"),
        age_grp="35 years & below",
        citizenship="SC",
        income_date=date(2026, 1, 1)
    )
    annual = result["annual_summary"]

    assert annual["cpf_liable_wage"] == Decimal("96000.00")
    assert annual["cpf_liable_bonus"] == Decimal("6000.00")

# Above 55 years age group 
async def test_cpf_above_55_age_grp(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("5000.00"),
        additional_income=Decimal("0.00"),
        age_grp="Above 55 - 60 years",
        citizenship="SC",
        income_date=date(2026, 1, 1),
    )
    rates = result["cpf_rates"]

    assert rates["employer_rate"] == Decimal("0.16")
    assert rates["employee_rate"] == Decimal("0.18")
    assert rates["total_rate"] == Decimal("0.34")

# PR1 citizenship 
async def test_cpf_pr1_citizenship(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("4000.00"),
        additional_income=Decimal("0.00"),
        age_grp="55 & Below",
        citizenship="PR1",
        income_date=date(2015, 6, 1),
    )
    rates = result["cpf_rates"]

    assert rates["employer_rate"] == Decimal("0.07")
    assert rates["employee_rate"] == Decimal("0.05")
    assert rates["total_rate"] == Decimal("0.12")

# PR2 citizenship 
async def test_cpf_pr2_citizenship(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("4000.00"),
        additional_income=Decimal("0.00"),
        age_grp="55 & Below",
        citizenship="PR2",
        income_date=date(2015, 6, 1),
    )
    rates = result["cpf_rates"]

    assert rates["employer_rate"] == Decimal("0.10")
    assert rates["employee_rate"] == Decimal("0.15")
    assert rates["total_rate"] == Decimal("0.25")