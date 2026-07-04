import pytest
from datetime import date
from decimal import Decimal

from app.services.cpf_service import calculate_cpf_contribution

pytestmark = pytest.mark.asyncio

# Below OW & AW ceilings
async def test_cpf_below_ow_and_aw_ceiling(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("4000.00"),
        additional_income=Decimal("5000.00"),
        age_grp="35 years & below",
        income_date=date(2026, 1, 1)
    )

    monthly = result["monthly_summary"]
    annual = result["annual_summary"]

    assert monthly["employee_share"] == Decimal("800.00")
    assert monthly["employer_share"] == Decimal("680.00")
    assert monthly["take_home_pay"] == Decimal("3200.00")

    assert annual["gross_income"] == Decimal("53000.00")
    assert annual["cpf_liable_bonus"] == Decimal("5000.00")

# Monthly income exceeds OW ceiling
async def test_cpf_monthly_income_above_ow_ceiling(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("10000.00"),
        additional_income=Decimal("0.00"),
        age_grp="35 years & below",
        income_date=date(2026, 1, 1)
    )

    monthly = result["monthly_summary"]

    assert monthly["employee_share"] == Decimal("1600.00")
    assert monthly["employer_share"] == Decimal("1360.00")

    assert monthly["take_home_pay"] == Decimal("8400.00")

# Additional income exceeds AW ceiling
async def test_cpf_bonus_above_aw_ceiling(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("9000.00"),
        additional_income=Decimal("50000.00"),
        age_grp="35 years & below",
        income_date=date(2026, 1, 1)
    )

    annual = result["annual_summary"]

    assert annual["cpf_liable_bonus"] == Decimal("6000.00")

# Zero additional income
async def test_cpf_no_bonus(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("5000.00"),
        additional_income=Decimal("0.00"),
        age_grp="35 years & below",
        income_date=date(2026, 1, 1)
    )

    annual = result["annual_summary"]

    assert annual["cpf_liable_bonus"] == Decimal("0.00")

# Zero wages
async def test_cpf_zero_income(db_session):
    result = await calculate_cpf_contribution(
        db=db_session,
        monthly_income=Decimal("0.00"),
        additional_income=Decimal("0.00"),
        age_grp="35 years & below",
        income_date=date(2026, 1, 1)
    )

    monthly = result["monthly_summary"]
    annual = result["annual_summary"]

    assert monthly["employee_share"] == Decimal("0")
    assert monthly["employer_share"] == Decimal("0")
    assert monthly["take_home_pay"] == Decimal("0.00")

    assert annual["gross_income"] == Decimal("0.00")
    assert annual["total_contribution"] == Decimal("0")