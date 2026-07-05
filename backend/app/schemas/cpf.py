from decimal import Decimal

from pydantic import BaseModel, Field

class MonthlySummary(BaseModel):
    employee_share: Decimal = Field(ge=0, description="Monthly employee CPF contribution")
    employer_share: Decimal = Field(ge=0, description="Monthly employer CPF contribution")
    take_home_pay: Decimal = Field(ge=0, description="Monthly net income received by employee")

class AnnualSummary(BaseModel):
    gross_income: Decimal = Field(ge=0, description="Total annual income in addition of annual bonus")
    employee_share: Decimal = Field(ge=0, description="Annual employee CPF contribution")
    employer_share: Decimal = Field(ge=0, description="Annual employer CPF contribution")
    total_contribution: Decimal = Field(ge=0, description="Total annual CPF contribution")
    cpf_liable_bonus: Decimal = Field(description="Additional wage amount capped by additonal wage ceiling")

class CPFRates(BaseModel):
    employee_rate: Decimal = Field(ge=0, desription="Employee CPF contribution rate")
    employer_rate: Decimal = Field(ge=0, desription="Employer CPF contribution rate")

class ContributionWrapper(BaseModel):
    monthly_summary: MonthlySummary
    annual_summary: AnnualSummary
    cpf_rates: CPFRates

class BaseAccount(BaseModel):
    amount: Decimal = Field(description="Amount in allocation account")
    rate: Decimal = Field(Description="Amount rate in allocation account")

class OrdinaryAccount(BaseAccount):
    pass

class SpecialAccount(BaseAccount):
    pass

class MedisaveAccount(BaseAccount):
    pass

class RetirementAccount(BaseAccount):
    pass

class AllocationWrapper(BaseModel):
    ordinary_account: OrdinaryAccount
    special_account: SpecialAccount
    medisave_account: MedisaveAccount
    retirement_account: RetirementAccount

class CPFBreakdownResponse(BaseModel):
    contribution_data: ContributionWrapper
    allocation_data: AllocationWrapper