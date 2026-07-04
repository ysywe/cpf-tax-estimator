from datetime import date
from decimal import Decimal

import pytest

from app.repositories.tax_repo import get_tax_bracket

@pytest.mark.asyncio
async def test_get_tax_bracket_returns_correct_bracket(db_session):
    bracket = await get_tax_bracket(
        db=db_session,
        chargeable_income=Decimal("56000"),
        income_date=date(2025, 1, 1),
    )

    assert bracket is not None
    assert bracket.min_income == Decimal("40000")
    assert bracket.max_income == Decimal("80000")
    assert bracket.tax_rate == Decimal("7.0")

# Latest effective date
@pytest.mark.asyncio
async def test_returns_latest_effective_rates(db_session):
    bracket = await get_tax_bracket(
        db_session,
        Decimal("56000"),
        date(2018, 6, 1),
    )

    assert bracket.effective_from == date(2017, 1, 1)

# Invalid chargeable income
@pytest.mark.asyncio
async def test_returns_open_ended_bracket(db_session):
    bracket = await get_tax_bracket(
        db_session,
        Decimal("9999999"),
        date(2025,1,1),
    )

    assert bracket.max_income is None

# Invalid effective date
@pytest.mark.asyncio
async def test_returns_none_if_no_effective_rates(db_session):
    bracket = await get_tax_bracket(
        db_session,
        Decimal("1000"),
        date(1990,1,1),
    )

    assert bracket is None