import pytest
from datetime import date
from decimal import Decimal

from app.services.tax_service import get_tax_breakdown, get_chargeable_income

pytestmark = pytest.mark.asyncio

@pytest.mark.asyncio
async def test_get_chargeable_income(db_session):
    chargeable_income = await get_chargeable_income(
        db=db_session,
        monthly_income=Decimal("6000"),
        additional_income=Decimal("0"),
        age=25,
        income_date=date(2025, 1, 1),
    )

    assert chargeable_income == Decimal("57600.00")

async def test_calculate_total_tax(db_session):
    result = await get_tax_breakdown(
        db=db_session,
        monthly_income=Decimal("9500.00"),
        additional_income=Decimal("15000.00"),
        age=22,
        income_date=date(2026, 1, 1),
    )

    assert result["chargeable_income"] == Decimal("108600.00")
    assert result["total_tax_payable"] == Decimal("6639.00")
    assert result["effective_tax_rate"] == Decimal("6.11")

# Zero chargeable income
@pytest.mark.asyncio
async def test_zero_chargeable_income(db_session):
    result = await get_tax_breakdown(
        db=db_session,
        monthly_income=Decimal("0.00"),
        additional_income=Decimal("0.00"),
        age=22,
        income_date=date(2026, 1, 1),
    )

    assert result["chargeable_income"] == Decimal("0.00")
    assert result["total_tax_payable"] == Decimal("0.00")
    assert result["effective_tax_rate"] == Decimal("0.0")

@pytest.mark.asyncio
async def test_tax_bracket_boundary(db_session):
    result = await get_tax_breakdown(
        db=db_session,
        monthly_income=Decimal("5000.00"),
        additional_income=Decimal("0.00"),
        age=22,
        income_date=date(2026, 1, 1),
    )

    assert result["chargeable_income"] == Decimal("48000.00")
    assert result["total_tax_payable"] == Decimal("1110.00")
    assert result["effective_tax_rate"] == Decimal("2.31")