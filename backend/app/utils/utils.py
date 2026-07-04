from datetime import datetime, date

def parse_effective_date(value: str) -> date:
    return datetime.strptime(value, "%Y-%m").date()

async def get_cpf_age_group(age: int) -> str:
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