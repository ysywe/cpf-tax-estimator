import { formatCurrency, formatMonthYear } from "../utils/utils"

export default function InputSummary({ inputs }) {
    if (!inputs) return null;
    const {
        birthMonthYear,
        contributionMonthYear, 
        ordinaryWages,
        additionalWages
    } = inputs;

    return (
        <div className="border-slate-200 bg-white">
            <h3 className="
                bg-stone-100
                mb-5 
                px-4
                py-3
                rounded-lg
                font-bold"
            >Based on your input
            </h3>
            <div className="
                border border-stone-200
                rounded-lg
                space-y-5 
                p-6"
            >
                <div className="
                    flex flex-col 
                    items-start 
                    justify-between 
                    gap-1"
                >
                    <span>Birth month and year</span>
                    <span className="
                        font-semibold
                        w-full 
                        pb-3
                        border-b border-slate-200 "
                    >{formatMonthYear(birthMonthYear)}
                    </span>
                    <span className="pt-3">Age group</span>
                    <span className="
                        font-semibold
                        w-full 
                        pb-3
                        border-b border-slate-200 "
                    >placeholder
                    </span>
                    <span className="pt-3">Ordinary Wages</span>
                    <span className="
                        font-semibold
                        w-full 
                        pb-3
                        border-b border-slate-200 "
                    >{formatCurrency(ordinaryWages)}
                    </span>
                    <span className="pt-3">Additional Wages</span>
                    <span className="
                        font-semibold
                        w-full 
                        pb-3
                        border-b border-slate-200 "
                    >{formatCurrency(additionalWages)}
                    </span>
                    <span className="pt-3">Total Wages</span>
                    <span className="
                        font-semibold
                        w-full"
                    >{formatCurrency(Number(ordinaryWages) + Number(additionalWages))}
                    </span>
                    
                </div>


            </div>
        </div>
    )
};