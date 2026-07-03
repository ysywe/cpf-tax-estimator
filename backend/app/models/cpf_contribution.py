from decimal import Decimal
from datetime import date

from sqlalchemy import Integer, String, Numeric, Date
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.hybrid import hybrid_property

from app.database import Base

class CPFContribution(Base):
    __tablename__ = "cpf_contribution"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    effective_from: Mapped[date] = mapped_column(Date)
    age_grp: Mapped[str] = mapped_column(String(20))
    employer_rate: Mapped[Decimal] = mapped_column(Numeric(5, 4), default=Decimal("0.0000"))
    employee_rate: Mapped[Decimal] = mapped_column(Numeric(5, 4), default=Decimal("0.0000"))

    @hybrid_property
    def total_rate(self) -> Decimal:
        return self.employer_rate + self.employee_rate