import json
import csv
import httpx
import asyncio

from pathlib import Path
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete
from decimal import Decimal

from app.models.wage_ceiling import WageCeiling
from app.models.tax_rate import TaxRate
from app.models.cpf_contribution import CPFContribution
from app.models.cpf_allocation import CPFAllocation
from app.utils.utils import parse_effective_date
from app.database import SessionLocal, create_tables

APP_FOLDER = Path(__file__).resolve().parent.parent
SEED_DATA = APP_FOLDER / "seed_data"

URL = "https://data.gov.sg/api/action/datastore_search"

async def load_wage_ceiling(db: AsyncSession) -> None:
    file = SEED_DATA / "wage_ceilings.json"

    data = json.loads(file.read_text(encoding="utf-8"))

    await db.execute(delete(WageCeiling))

    for item in data:
        db.add(
            WageCeiling(
                effective_from=parse_effective_date(item["effective_from"]),
                ow_ceiling=item["ow_ceiling"],
                aw_ceiling=item["aw_ceiling"]
            )
        )
    await db.commit()

async def load_tax_rate(db: AsyncSession) -> None:
    file = SEED_DATA / "tax_rates.json"

    data = json.loads(file.read_text(encoding="utf-8"))

    await db.execute(delete(TaxRate))

    for item in data:
        for bracket in item["brackets"]:
            db.add(
                TaxRate(
                    effective_from= parse_effective_date(item["effective_from"]),
                    min_income=bracket["min_income"],
                    max_income=bracket["max_income"],
                    tax_rate=bracket["tax_rate"],
                    tax_payable=bracket["tax_payable"]
                )
            )
    await db.commit()

async def load_pr_cpf_contribution(db: AsyncSession) -> None:
    file = SEED_DATA / "pr_cpf_rates.csv"

    with file.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)

        for row in reader:
            db.add(
                CPFContribution(
                    effective_from=parse_effective_date(row["effective_from"]),
                    citizenship=row["citizenship"],
                    age_grp=row["age_group"],
                    employer_rate=Decimal(row["employer_rate"]),
                    employee_rate=Decimal(row["employee_rate"])
                )
            )
    await db.commit()

async def load_sc_cpf_contribution(db: AsyncSession) -> None:
    query_params = {
        "resource_id": "d_98ffa142ae0dec40391f78f81d26aca9",
        "limit": 1000
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(URL, params=query_params)
        response.raise_for_status()
        response_data = response.json()

    if response_data.get("success"):
        matrix = {}
        records = response_data["result"]["records"]

        for record in records:
            parsed_effec_date = parse_effective_date(record["effective_from"])
            key = (parsed_effec_date, record["age_grp"])
            contributing_party = record["contributing_party"]
            contribution_rate=  Decimal(record["contribution_rate"]) / Decimal("100.0")
            
            if key not in matrix:
                matrix[key] = {
                    "Employer": Decimal("0.0000"),
                    "Employee": Decimal("0.0000")
                }
            matrix[key][contributing_party] = contribution_rate
    
        for (effec_from, age_grp), rates in matrix.items():
            db.add(
                CPFContribution(
                    effective_from=effec_from,
                    citizenship="SC",
                    age_grp=age_grp,
                    employer_rate=rates["Employer"],
                    employee_rate=rates["Employee"]
                )
            )
        await db.commit()

async def load_cpf_contribution(db: AsyncSession) -> None:
    await db.execute(delete(CPFContribution))
    await load_pr_cpf_contribution(db)
    await load_sc_cpf_contribution(db)

async def load_cpf_allocation(db: AsyncSession) -> None:
    query_params = {
        "resource_id": "d_97ec9a2ce15cbf253128e48779a3fba0",
        "limit": 1000
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(URL, params=query_params)
        response.raise_for_status()
        response_data = response.json()

    if response_data.get("success"):
        matrix = {}
        records = response_data["result"]["records"]

        for record in records:
            parsed_effec_from = parse_effective_date(record["effective_from"])
            key =  (parsed_effec_from, record["age_grp"])
            account_type = record["account_type"]
            allocation_rate = record["allocation_rate"]

            if key not in matrix:
                matrix[key] = {
                    "Ordinary": Decimal("0.0000"),
                    "Special": Decimal("0.0000"),
                    "Medisave": Decimal("0.0000"),
                    "Retirement": Decimal("0.0000")
                }
            matrix[key][account_type] = Decimal(allocation_rate)

        await db.execute(delete(CPFAllocation))

        for (effec_from, age_grp), rates in matrix.items():
            db.add(
                CPFAllocation(
                    effective_from=effec_from,
                    age_grp=age_grp,
                    oa_rate=rates["Ordinary"],
                    sa_rate=rates["Special"],
                    ma_rate=rates["Medisave"],
                    ra_rate=rates["Retirement"]
                )
            )
        await db.commit()
    
async def seed_data(db: AsyncSession) -> None:
    await load_wage_ceiling(db)
    await load_tax_rate(db)
    await load_cpf_contribution(db)
    await load_cpf_allocation(db)

async def main():
    await create_tables()

    async with SessionLocal() as db:
        await seed_data(db)

if __name__ == "__main__":
    asyncio.run(main())

