from decimal import Decimal

import pytest
from httpx import AsyncClient

async def test_estimate_success(async_client: AsyncClient):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": 5000,
            "additional_income": 12000,
            "age": 25,
            "income_date": "2025-01-01"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "CPFBreakdownResponse" in data
    assert "TaxBreakdownResponse" in data

# Invalid monthly income input
async def test_negative_income(async_client):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": -5000,
            "additional_income": 0,
            "age": 30,
            "income_date": "2025-01-01"
        }
    )

    assert response.status_code == 422

# Invalid age input
@pytest.mark.asyncio
async def test_invalid_age(async_client):
    payload = {
        "monthly_income": 6000,
        "additional_income": 0,
        "age": -5,
        "income_date": "2025-01-01"
    }

    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json=payload
    )

    assert response.status_code == 422

# Invalid income date input
async def test_invalid_date(async_client):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": 5000,
            "additional_income": 0,
            "age": 30,
            "income_date": "invalid-date"
        }
    )

    assert response.status_code == 422

# Diferent ages
@pytest.mark.parametrize(
    "age",
    [
        35,
        36,
        45,
        46,
        55,
        56,
        60,
        61,
        65,
        66,
    ],
)
async def test_age_boundaries(async_client, age):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": 5000,
            "additional_income": 0,
            "age": age,
            "income_date": "2025-01-01"
        }
    )

    assert response.status_code == 200

# Different monthly income
@pytest.mark.parametrize(
    "salary",
    [
        1000,
        3000,
        7550,
        8000,
        12000,
    ]
)
async def test_salary_ceilings(async_client, salary):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": salary,
            "additional_income": 0,
            "age": 30,
            "income_date": "2025-01-01"
        }
    )

    assert response.status_code == 200

# Different income dates
@pytest.mark.parametrize(
    "date",
    [
        "2024-01-01",
        "2025-01-01",
        "2026-01-01",
    ]
)
async def test_effective_dates(async_client, date):
    response = await async_client.post(
        "/cpf-tax-estimator/estimate",
        json={
            "monthly_income": 5000,
            "additional_income": 10000,
            "age": 30,
            "income_date": date
        }
    )

    assert response.status_code == 200