export default function YearGrid({
    year,
    decadeYears,
    onYearSelect,
}) {
    return (
        <div className="grid grid-cols-3 gap-x-2 gap-y-3">
            {decadeYears.map((y, index) => {
                const outside =
                    index === 0 || index === 11;
                return (
                    <button
                        key={y}
                        type="button"
                        onClick={() => onYearSelect(y)}
                        className={`
                            rounded-full
                            py-2
                            cursor-pointer
                            font-light
                            ${outside ? "text-slate-600": ""}
                            ${
                                y === year
                                    ? "bg-indigo-800 text-white"
                                    : "hover:bg-slate-100"
                            }
                        `}
                    >{y}
                    </button>
                );
            })}
        </div>
    )
}