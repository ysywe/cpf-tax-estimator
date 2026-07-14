import { formatPercent, formatCurrency } from "../utils/utils"

export default function AllocationSection({result}) {
    const { allocation } = result
    const { 
        ordinary_account, 
        special_account,  
        medisave_account,
        retirement_account
    } = allocation

    const rows = [
        {
            name: "Ordinary Account",
            ...ordinary_account,
        },
        {
            name: "Special Account",
            ...special_account,
        },
        {
            name: "MediSave Account",
            ...medisave_account,
        },
        retirement_account && {
            name: "Retirement Account",
            ...retirement_account,
        },
    ].filter(Boolean);

    const total_rate = rows.reduce(
        (sum, row) => sum + Number(row.rate),0
    );

    const total_amt = rows.reduce(
        (sum, row) => sum + Number(row.amount),0
    );

    return (
        <div className="
            rounded-md
            overflow-hidden 
            border border-stone-200 
            p-6"
        >
            <h3 className="
                hidden 
                sm:grid 
                grid-cols-[2fr_1fr_1.2fr]
                bg-slate-100
                rounded-md
                px-6 py-3 
                font-medium
                text-slate-800"
            >
                <span>Account</span>
                <span className="text-right">Rate</span>
                <span className="text-right">Amount</span>
            </h3>

            {rows.map((row) => (
                <div
                    key={row.name}
                    className="
                        grid
                        gap-2
                        border-slate-100
                        py-3
                        sm:grid-cols-[2fr_1fr_1.2fr]
                        sm:items-center
                        sm:px-6 sm:py-5"
                >
                    <h4 className="
                        font-medium
                        bg-slate-50
                        px-4 py-2
                        rounded-md
                        text-slate-800
                        sm:bg-white 
                        sm:p-0 
                        sm:text-slate-700
                        sm:font-normal"
                    >{row.name}
                    </h4>

                    <div className="
                        flex 
                        justify-between 
                        sm:block sm:text-right
                        ml-6"
                    >
                        <span className="
                            sm:hidden 
                            text-slate-600 
                            text-sm 
                            font-medium"
                        >Rate
                        </span>

                        <span className="text-slate-800">{formatPercent(row.rate)}</span>
                    </div>

                    <div className="
                        flex 
                        justify-between 
                        sm:block sm:text-right
                        ml-6"
                    >
                        <span className="
                            sm:hidden 
                            text-slate-600 
                            text-sm 
                            font-medium"
                        >Amount
                        </span>

                        <span className="text-slate-800">{formatCurrency(row.amount)}</span>
                    </div>
                </div>
            ))}

            <div
                className="
                    grid
                    bg-slate-50
                    px-6 py-4
                    font-semibold
                    rounded-md
                    sm:grid-cols-[2fr_1fr_1.2fr]"
            >
                <span className="text-slate-900">Total</span>

                <span className="text-right text-slate-800">
                    {formatPercent(total_rate)}
                </span>

                <span className="text-right text-slate-800">
                    {formatCurrency(total_amt)}
                </span>
            </div>
        </div>
    )

}