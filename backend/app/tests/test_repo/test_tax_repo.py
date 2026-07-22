import pytest
from datetime import date
from decimal import Decimal

from app.repositories.tax_repo import get_tax_bracket

pytestmark = pytest.mark.asyncio

# Latest effective tax rate
async def test_repo_latest_tax_record(db_session):
    bracket = await get_tax_bracket(
        db_session,
        Decimal("56000"),
        date(2025, 1, 1),
    )

    assert bracket.effective_from == date(2024, 1, 1)

# Tax bracket min and max income
async def test_repo_tax_record_min_max_income(db_session):
    bracket = await get_tax_bracket(
        db_session,
        Decimal("80000"),
        date(2025, 1, 1),
    )

    assert bracket.min_income == Decimal("80000")
    assert bracket.max_income == Decimal("120000")

# Invalid chargeable income
async def test_repo_invalid_chargeable_income(db_session):
    bracket = await get_tax_bracket(
        db_session,
        Decimal("9999999"),
        date(2025,1,1),
    )

    assert bracket.max_income is None

# Invalid effective date
async def test_repo_invalid_effective_from(db_session):
    bracket = await get_tax_bracket(
        db_session,
        Decimal("1000"),
        date(1990,1,1),
    )

    assert bracket is None