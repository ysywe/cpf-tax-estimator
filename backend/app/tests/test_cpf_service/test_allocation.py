import pytest
from datetime import date
from decimal import Decimal

from app.services.cpf_service import calculate_cpf_allocation

pytestmark = pytest.mark.asyncio

# Zero CPF total contribution 
async def test_cpf_alloc_no_contribution(db_session):
    result = await calculate_cpf_allocation(
        db=db_session,
        total_contribution=Decimal("0.00"),
        age_grp="35 years & below",
        income_date=date(2026, 1, 1)
    )

    assert result["ordinary_account"]["amount"] == Decimal("0.00")
    assert result["special_account"]["amount"] == Decimal("0.00")
    assert result["medisave_account"]["amount"] == Decimal("0.00")
    assert result["retirement_account"]["amount"] == Decimal("0.00")

# 35 years & below age group
async def test_cpf_alloc_below_35_age_grp(db_session):
    result = await calculate_cpf_allocation(
        db=db_session,
        total_contribution=Decimal("5180.00"),
        age_grp="35 years & below",
        income_date=date(2026, 1, 1)
    )

    assert result["ordinary_account"]["amount"] == Decimal("3220.41")
    assert result["ordinary_account"]["rate"] == Decimal("0.6217")

    assert result["special_account"]["amount"] == Decimal("839.68")
    assert result["special_account"]["rate"] == Decimal("0.1621")

    assert result["medisave_account"]["amount"] == Decimal("1119.92")
    assert result["medisave_account"]["rate"] == Decimal("0.2162")

    assert result["retirement_account"]["amount"] == Decimal("0.00")
    assert result["retirement_account"]["rate"] == Decimal("0.0000")

# Above 70 years age group
async def test_cpf_alloc_age_above_70_age_grp(db_session):
    result = await calculate_cpf_allocation(
        db=db_session,
        total_contribution=Decimal("6000.00"),
        age_grp="Above 70 years",
        income_date=date(2026, 1, 1)
    )

    assert result["retirement_account"]["amount"] == Decimal("480.00")
    assert result["retirement_account"]["rate"] == Decimal("0.0800")