from decimal import Decimal
from datetime import date

from sqlalchemy import Integer, String, Numeric, Date
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class CPFAllocation(Base):
    __tablename__ = "cpf_allocation"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    effective_from: Mapped[date] = mapped_column(Date)
    age_grp: Mapped[str] = mapped_column(String(20))
    oa_rate: Mapped[Decimal] = mapped_column(Numeric(5, 4), default=Decimal("0.0000"))
    sa_rate: Mapped[Decimal] = mapped_column(Numeric(5, 4), default=Decimal("0.0000"))
    ma_rate: Mapped[Decimal] = mapped_column(Numeric(5, 4), default=Decimal("0.0000"))
    ra_rate: Mapped[Decimal] = mapped_column(Numeric(5, 4), default=Decimal("0.0000"))