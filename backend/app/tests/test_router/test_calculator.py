import pytest

# Different citizenships
@pytest.mark.parametrize(
    "citizenship",
    [
        "SC",
        "PR1",
        "PR2",
    ]
)
async def test_route_citizenship_types(async_client, citizenship):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": 5000,
            "additional_income": 5000,
            "age": 30,
            "citizenship": citizenship,
            "income_date": "2026-01-01",
        },
    )

    assert response.status_code == 200

# Sum of ordinary and additional wage is less than $50
async def test_route_ow_aw_sum(async_client):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": 49,
            "additional_income": 0,
            "age": 30,
            "citizenship": "SC",
            "income_date": "2025-01-01"
        }
    )

    assert response.status_code == 422

# Client must be of 18 years of age
@pytest.mark.asyncio
async def test_route_invalid_age(async_client):
    payload = {
        "monthly_income": 6000,
        "additional_income": 0,
        "age": 17,
        "citizenship": "SC",
        "income_date": "invalid-date"
    }

    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json=payload
    )

    assert response.status_code == 422