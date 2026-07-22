import pytest
from datetime import date
from decimal import Decimal

from app.repositories.cpf_repo import get_cpf_record, get_alloc_record, get_wage_ceiling_record

pytestmark = pytest.mark.asyncio

# Latest CPF contribution record
async def test_repo_latest_contrib_record(db_session):
    result = await get_cpf_record(
        db=db_session,
        age_grp="35 years & below",
        citizenship="SC",
        income_date=date(2025, 6, 1),
    )

    assert result.effective_from == date(2025, 1, 1)
    assert result.employee_rate == Decimal("0.2000")
    assert result.employer_rate == Decimal("0.1700")

# PR1 citizenship CPF record
async def test_repo_pr1_rates(db_session):
    result = await get_cpf_record(
        db=db_session,
        age_grp="55 & Below",
        citizenship="PR1",
        income_date=date(2026, 1, 1),
    )

    assert result.employee_rate == Decimal("0.0500")
    assert result.employer_rate == Decimal("0.0400")

# Non-existent CPF contribution record 
async def test_repo_cpf_contrib_record_not_found(db_session):
    result = await get_cpf_record(
        db=db_session,
        age_grp="Invalid Age Group",
        citizenship="SC",
        income_date=date(2026, 1, 1),
    )

    assert result is None

# Latest CPF allocation record
async def test_repo_latest_alloc_record(db_session):
    result = await get_alloc_record(
        db_session,
        "35 years & below",
        date(2026, 6, 1),
    )

    assert result.effective_from == date(2026, 1, 1)

# Non-existent CPF allocation record 
async def test_repo_cpf_alloc_record_not_found(db_session):
    result = await get_alloc_record(
        db_session,
        "Invalid Age Group",
        date(2026, 1, 1),
    )

    assert result is None

# Latest wage ceiling record
async def test_get_latest_wage_ceiling(db_session):
    result = await get_wage_ceiling_record(
        db_session,
        date(2026, 8, 1),
    )

    assert result.effective_from == date(2026, 1, 1)
    assert result.ow_ceiling == Decimal("8000.00")

# Earliest wage ceiling record
async def test_get_earliest_wage_ceiling(db_session):
    result = await get_wage_ceiling_record(
        db_session,
        date(2015, 3, 1),
    )

    assert result.effective_from == date(2015, 1, 1)

# Non-existent wage ceiling record
async def test_get_wage_ceiling_before_first_record(db_session):
    result = await get_wage_ceiling_record(
        db_session,
        date(2014, 1, 1),
    )

    assert result is None