from datetime import datetime, date

def parse_effective_date(value: str) -> date:
    return datetime.strptime(value, "%Y-%m").date()
