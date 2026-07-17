from datetime import datetime, date

def parse_effective_date(value: str) -> date:
    return datetime.strptime(value, "%Y-%m").date()

def get_sc_age_group(age: int) -> str:
    if age <= 35:
        return "35 years & below"
    elif 35 < age <= 45:
        return "Above 35 - 45 years"
    elif 45 < age <= 50:
        return "Above 45 - 50 years"
    elif 50 < age <= 55:
        return "Above 50 - 55 years"
    elif 55 < age <= 60:
        return "Above 55 - 60 years"
    elif 60 < age <= 65:
        return "Above 60 - 65 years"
    elif 65 < age <= 70:
        return "Above 65 - 70 years"
    else:
        return "Above 70 years"
    
def get_pr_age_group(age: int) -> str:
    if age <= 55:
        return "55 & Below"
    elif age <= 60:
        return "Above 55 to 60"
    elif age <= 65:
        return "Above 60 to 65"
    elif age <= 70:
        return "Above 65 to 70"
    return "Above 70"

def get_cpf_age_group(age: int, citizenship: str | None) -> str:
    if citizenship == "SC" or citizenship is None:
        return get_sc_age_group(age)
    return get_pr_age_group(age)