import pytest
from datetime import date
from decimal import Decimal

from app.services.tax_service import get_tax_breakdown

pytestmark = pytest.mark.asyncio

# Zero chargeable income
async def test_tax_no_chargeable_income(db_session):
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

# Tax breakdown for Singaporean citizen
async def test_tax_breakdown_sc(db_session):
    result = await get_tax_breakdown(
        db=db_session,
        monthly_income=Decimal("9500.00"),
        additional_income=Decimal("15000.00"),
        age=22,
        citizenship="SC",
        income_date=date(2026, 1, 1),
    )

    assert result["chargeable_income"] == Decimal("108600.00")
    assert result["total_tax_payable"] == Decimal("6639.00")
    assert result["effective_tax_rate"] == Decimal("6.11")

# Tax breakdown for PR1 citizenship
async def test_tax_breakdown_pr1(db_session):
    result = await get_tax_breakdown(
        db=db_session,
        monthly_income=Decimal("9500.00"),
        additional_income=Decimal("15000.00"),
        age=22,
        citizenship="PR1",
        income_date=date(2026, 1, 1),
    )

    assert result["chargeable_income"] == Decimal("123900.00")
    assert result["total_tax_payable"] == Decimal("8535.00")
    assert result["effective_tax_rate"] == Decimal("0.07")

# Tax breakdown for PR2 citizenship
async def test_tax_breakdown_pr2(db_session):
    result = await get_tax_breakdown(
        db=db_session,
        monthly_income=Decimal("9500.00"),
        additional_income=Decimal("15000.00"),
        age=22,
        citizenship="PR2",
        income_date=date(2026, 1, 1),
    )

    assert result["chargeable_income"] == Decimal("113700.00")
    assert result["total_tax_payable"] == Decimal("7225.50")
    assert result["effective_tax_rate"] == Decimal("0.06")