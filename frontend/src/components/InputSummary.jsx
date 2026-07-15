import { formatCurrency, formatMonthYear } from "../utils/utils"

export default function InputSummary({ inputs, result }) {
    if (!inputs) return null;
    const {
        birthMonthYear,
        contributionMonthYear, 
        ordinaryWages,
        additionalWages
    } = inputs;

    const { contribution } = result

    const rows = [
        { 
            name: "Birth month and year", 
            value: formatMonthYear(birthMonthYear)
        },
        { 
            name: "Contribution month and Year", 
            value: formatMonthYear(contributionMonthYear)
        },
        { 
            name: "Age group", 
            value: contribution.age_group 
        },
        { 
            name: "Ordinary wages", 
            value: formatCurrency(ordinaryWages )
        },
        { 
            name: "Additional wages", 
            value: formatCurrency(additionalWages)
        },
        { 
            name: "Total wages", 
            value: formatCurrency(Number(ordinaryWages) + Number(additionalWages)) 
        },
    ].filter(Boolean);

    return (
        <div className="border-slate-200 bg-white">
            <h3 className="
                bg-slate-100
                mb-5 
                px-4 py-3
                rounded-md
                font-medium
                text-slate-800"
            >Based on your input
            </h3>
            <div className="
                border border-stone-200
                rounded-md
                p-6"
            >
                {rows.map((row) => (
                    <div 
                        key={row.name}
                        className="flex flex-col gap-1"
                    >
                        <h4 className="
                            rounded-md
                            text-slate-700
                            w-full"
                        >{row.name}
                        </h4>
                        <span className="
                            font-medium
                            w-full 
                            mb-5
                            text-slate-800"
                        >{row.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
};