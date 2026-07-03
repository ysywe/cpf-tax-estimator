from decimal import Decimal
from datetime import date

from sqlalchemy import Numeric, Date
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class WageCeiling(Base):
    __tablename__ = "wage_ceilings"

    effective_from: Mapped[date] = mapped_column(Date, primary_key=True)
    ow_ceiling: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    aw_ceiling: Mapped[Decimal] = mapped_column(Numeric(10, 2))