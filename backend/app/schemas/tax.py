from decimal import Decimal

from pydantic import BaseModel, Field

class TaxBreakdownResponse(BaseModel):
    chargeable_income: Decimal = Field(ge=0, description="Gross annual income after CPF reliefs")
    total_tax_payable: Decimal = Field(ge=0, description="Total tax amount payable in SGD")
    effective_tax_rate: Decimal = Field(ge=0, description="Total tax rate applied on chargeable income")