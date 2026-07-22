from datetime import date
from decimal import Decimal

from app.repositories.cpf_repo import get_cpf_record, get_wage_ceiling_record

async def test_get_latest_cpf_contribution_rate(db_session):
    result = await get_cpf_record(
        db=db_session,
        age_grp="35 years & below",
        citizenship="SC",
        income_date=date(2025, 6, 1),
    )

    assert result is not None
    assert result.age_grp == "35 years & below"
    assert result.effective_from == date(2025, 1, 1)
    assert result.employee_rate == Decimal("0.2000")
    assert result.employer_rate == Decimal("0.1700")

# Latest effective date
async def test_get_previous_wage_ceiling(db_session):
    result = await get_wage_ceiling_record(db_session, date(2024, 3, 1))

    assert result.effective_from == date(2024, 1, 1)