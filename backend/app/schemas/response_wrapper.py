from pydantic import BaseModel

from app.schemas.cpf import CPFBreakdownResponse
from app.schemas.tax import TaxBreakdownResponse

class ResponseWrapperResponse(BaseModel):
    CPFBreakdownResponse : CPFBreakdownResponse
    TaxBreakdownResponse: TaxBreakdownResponse