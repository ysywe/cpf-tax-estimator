from decimal import Decimal

from pydantic import BaseModel, Field, computed_field

class MonthlySummary(BaseModel):
    employee_share: Decimal = Field(ge=0, description="Monthly employee CPF contribution")
    employer_share: Decimal = Field(ge=0, description="Monthly employer CPF contribution")
    take_home_pay: Decimal = Field(ge=0, description="Monthly net income received by employee")

class AnnualSummary(BaseModel):
    gross_income: Decimal = Field(ge=0, description="Total annual income in addition of annual bonus")
    employee_share: Decimal = Field(ge=0, description="Annual employee CPF contribution")
    employer_share: Decimal = Field(ge=0, description="Annual employer CPF contribution")
    total_contribution: Decimal = Field(ge=0, description="Total annual CPF contribution")
    cpf_liable_wage: Decimal = Field(ge=0, description="Annual ordinary wage amount capped by additonal wage ceiling")
    cpf_liable_bonus: Decimal = Field(description="Additional wage amount capped by additonal wage ceiling")

class CPFRates(BaseModel):
    employee_rate: Decimal = Field(ge=0, description="Employee CPF contribution rate")
    employer_rate: Decimal = Field(ge=0, description="Employer CPF contribution rate")
    total_rate: Decimal = Field(ge=0, description="Sum of employee and employer CPF contribution rate")

class ContributionWrapper(BaseModel):
    monthly_summary: MonthlySummary
    annual_summary: AnnualSummary
    cpf_rates: CPFRates
    age_group: str = Field(description="Employee's CPF age group in years")

class BaseAccount(BaseModel):
    amount: Decimal = Field(description="Amount in allocation account")
    rate: Decimal = Field(description="Amount rate in allocation account")

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