from datetime import date
from decimal import Decimal

from pydantic import BaseModel, Field, model_validator, field_validator

class CalculateTaxRequest(BaseModel):
    monthly_income: Decimal = Field(default=Decimal("0.00"), ge=0, description="Gross monthly salary in SGD")
    additional_income: Decimal = Field(default=Decimal("0.00"), ge=0, description="AWS or performance bonuses")
    age: int = Field(ge=0, description="Client's current age")
    citizenship: str = Field(description="Client's citizenship status")
    income_date: date = Field(description="Date the income was earned (YYYY-MM)")

    @field_validator("income_date")
    @classmethod
    def validate_income_date(cls, value: date):
        min_date = date(2015, 1, 1)
        max_date = date(date.today().year, 12, 31)

        if not (min_date <= value <= max_date):
            raise ValueError(
                f"Income date must be between {min_date} and {max_date}."
            )
        return value

    @model_validator(mode="after")
    def validate_cpf_liable_income(self):
        if self.monthly_income + self.additional_income <= Decimal("50.00"):
            raise ValueError(
                "The sum of ordinary wages and additional wages must be more than $50."
            )
        return self