from decimal import Decimal

from pydantic import BaseModel, Field

class TaxBreakdownResponse(BaseModel): 
    chargeable_income: Decimal = Field(ge=0, description="Gross annual income after CPF reliefs")
    min_income: Decimal = Field(ge=0, decription="Minimum income for chargeable income")
    excess_income: Decimal = Field(ge=0, description="Chargeable income deducted by minimum income")
    tax_rate: Decimal = Field(ge=0, description="Income tax rate")
    excess_tax: Decimal = Field(ge=0, description="Excess tax amount payable based on tax rate")
    tax_payable: Decimal = Field(ge=0, description="Tax amount payable exclusive of excess tax")
    total_tax_payable: Decimal = Field(ge=0, description="Total tax amount inclusive of excess tax")
    effective_tax_rate: Decimal = Field(ge=0, description="Total tax rate applied on chargeable income")