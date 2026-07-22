from datetime import date
from decimal import Decimal

from pydantic import BaseModel, Field, model_validator, field_validator

class CalculateTaxRequest(BaseModel):
    monthly_income: Decimal = Field(default=Decimal("0.00"), ge=0, description="Gross monthly salary in SGD")
    additional_income: Decimal = Field(default=Decimal("0.00"), ge=0, description="AWS or performance bonuses")
    age: int = Field(ge=18, le=100, description="Client's current age")
    citizenship: str = Field(description="Client's citizenship status")
    income_date: date = Field(description="Date the income was earned (YYYY-MM)")

    @model_validator(mode="after")
    def validate_cpf_liable_income(self):
        if self.monthly_income + self.additional_income <= Decimal("50.00"):
            raise ValueError(
                "The sum of ordinary wages and additional wages must be more than $50."
            )
        return self