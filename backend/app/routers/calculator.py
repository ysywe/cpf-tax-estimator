from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.services.cpf_service import get_cpf_breakdown
from app.services.tax_service import get_tax_breakdown
from backend.app.schemas.calculate_request import CalculateTaxRequest
from app.schemas.response_wrapper import ResponseWrapperResponse

db_session = Annotated[AsyncSession, Depends(get_db)]

calculator_router = APIRouter(prefix="/cpf-tax-estimator", tags=["Calculator"])

@calculator_router.post("/estimate")
async def estimate(payload: CalculateTaxRequest, db: db_session) -> ResponseWrapperResponse:  
    cpf_breakdown = await get_cpf_breakdown(
        db=db,
        monthly_income=payload.monthly_income,
        additional_income=payload.additional_income,
        age=payload.age,
        income_date=payload.income_date
    )

    tax_breakdown = await get_tax_breakdown(
        db=db,
        monthly_income=payload.monthly_income,
        additional_income=payload.additional_income,
        age=payload.age,
        income_date=payload.income_date
    )

    return ResponseWrapperResponse(CPFBreakdownResponse=cpf_breakdown, TaxBreakdownResponse=tax_breakdown)