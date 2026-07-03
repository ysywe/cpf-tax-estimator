from decimal import Decimal
from datetime import date

from sqlalchemy import Numeric, Date, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class TaxRate(Base):
    __tablename__ = "tax_rates"

    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    effective_from: Mapped[date] = mapped_column(Date)
    min_income: Mapped[Decimal] = mapped_column(Numeric(12, 2))
    max_income: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=True)
    tax_rate: Mapped[Decimal] = mapped_column(Numeric(4, 2))
    tax_payable: Mapped[Decimal] = mapped_column(Numeric(12, 2))