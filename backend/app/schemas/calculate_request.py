from datetime import date
from decimal import Decimal

from pydantic import BaseModel, Field

class CalculateTaxRequest(BaseModel):
    monthly_income: Decimal = Field(ge=0, description="Gross monthly salary in SGD")
    additional_income: Decimal = Field(default=Decimal("0.00"), description="AWS or performance bonuses")
    age: int = Field(le=100, ge=18, description="Client's current age")
    income_date: date = Field(description="Date the income was earned (YYYY-MM)")