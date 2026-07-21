export default function MonthGrid({
    months,
    year,
    selectedYear,
    selectedMonth,
    onMonthSelect,
}) {
    return (
        <div className="grid grid-cols-3 gap-x-2 gap-y-3">
            {months.map((month, index) => {
                const active =
                    year === selectedYear &&
                    index + 1 === selectedMonth;

                return (
                    <button
                        key={month}
                        type="button"
                        onClick={() => onMonthSelect(index)}
                        className={`
                            rounded-full
                            py-2
                            cursor-pointer
                            font-light
                            ${
                                active
                                    ? "bg-indigo-800 text-white"
                                    : "hover:bg-slate-100"
                            }
                        `}
                    >
                        {month}
                    </button>
                );
            })}
        </div>
    );
}