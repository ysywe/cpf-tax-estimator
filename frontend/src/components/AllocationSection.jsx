import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";
import { formatPercent, formatCurrency } from "../utils/utils"

export default function AllocationSection({result}) {
    const { allocation, contribution } = result
    const { 
        ordinary_account, 
        special_account,  
        medisave_account,
        retirement_account
    } = allocation

    const total_contribution = contribution.annual_summary.total_contribution

    const rows = [
        {
            name: "Ordinary",
            color: "#4F46E5",
            ...ordinary_account,
        },
        {
            name: "Special",
            color: "#10B981",
            ...special_account,
        },
        {
            name: "MediSave",
            color: "#F59E0B",
            ...medisave_account,
        },
        retirement_account && {
            name: "Retirement",
            color: "#EF4444",
            ...retirement_account,
        },
    ]
    .filter(Boolean)
    .map((row) => ({
        ...row,
        amount: Number(row.amount),
        rate: Number(row.rate),
    }));

    const total_rate = rows.reduce(
        (sum, row) => sum + Number(row.rate),0
    );

    return (
        <div className="
            rounded-md
            overflow-hidden 
            border border-stone-200 
            p-6
            grid
            md:grid-cols-[280px_1fr]"
        >
            <div className="
                relative 
                h-70"
            >
                <ResponsiveContainer 
                    width="100%" 
                    height="100%" 
                >
                    <PieChart>
                        <Pie
                            data={rows}
                            dataKey="amount"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={105}
                            paddingAngle={2}
                        >
                            {rows.map((row) => (
                                <Cell
                                    key={row.name}
                                    fill={row.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)}/>
                    </PieChart>
                </ResponsiveContainer>
                <div
                    className="
                        absolute inset-0
                        flex flex-col
                        items-center
                        justify-center
                        pointer-events-none"
                >
                    <span className="text-sm text-slate-600">
                        Total CPF
                    </span>

                    <span className="text-xl font-semibold text-slate-800">
                        {formatCurrency(total_contribution)}
                    </span>
                </div>
            </div>

            <div>
                <h3 className="
                    hidden 
                    sm:grid 
                    grid-cols-[2fr_1fr_1.2fr]
                    bg-slate-100
                    rounded-md
                    px-4 py-2 
                    font-medium
                    text-slate-800
                    sm:font-normal
                    md:grid-cols-3 md:place-items-center"
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
                            py-3
                            sm:grid-cols-[2fr_1fr_1.2fr]
                            sm:items-center
                            sm:px-5 sm:py-4
                            md:grid-cols-3 md:place-items-center"
                    >
                        <h4 className="
                            font-semibold
                            bg-slate-50
                            rounded-md
                            px-4 py-2
                            sm:bg-white 
                            sm:p-0 
                            sm:font-medium"
                            style={{ color: row.color }}
                        >{row.name}
                        </h4>

                        <div className="
                            flex 
                            justify-between 
                            sm:block sm:text-right"
                        >
                            <span className="
                                sm:hidden 
                                text-slate-600 
                                text-sm 
                                font-medium
                                ml-6"
                            >Rate
                            </span>

                            <span className="text-slate-800">{formatPercent(row.rate)}</span>
                        </div>

                        <div className="
                            flex 
                            justify-between 
                            sm:block sm:text-right"
                        >
                            <span className="
                                sm:hidden 
                                text-slate-600 
                                text-sm 
                                font-medium
                                ml-6"
                            >Amount
                            </span>

                            <span className="text-slate-800">{formatCurrency(row.amount)}</span>
                        </div>
                    </div>
                ))}
            
                <div
                    className="
                        grid
                        gap-2
                        bg-slate-50
                        text-slate-800
                        px-5 py-2
                        mt-2
                        font-semibold
                        rounded-md
                        sm:grid-cols-[2fr_1fr_1.2fr]
                        md:grid-cols-3 md:place-items-center"
                >
                    <span>Total</span>

                    <span className="text-right">
                        {formatPercent(total_rate)}
                    </span>

                    <span className="text-right">
                        {formatCurrency(total_contribution)}
                    </span>
                </div>
            </div>
        </div>
    )

}