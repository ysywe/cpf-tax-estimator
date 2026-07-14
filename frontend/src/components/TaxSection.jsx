import { formatCurrency, formatPercent } from "../utils/utils";

export default function TaxSection({result}) {
    const { contribution, tax } = result
    const { annual_summary, cpf_rates } = contribution
    const {
        chargeable_income,
        min_income,
        excess_income,
        tax_rate,
        excess_tax,
        tax_payable,
        total_tax_payable,
        effective_tax_rate,
    } = tax

    const gross_income = annual_summary.gross_income
    const annual_cpf_relief = annual_summary.employee_share

    return (
        <div className="
            rounded-md
            overflow-hidden 
            border border-stone-200 
            p-6"
        >
            <div className="
                flex flex-col 
                gap-3
                pb-5"
            >
                <h4 className="
                    font-semibold
                    bg-slate-50
                    px-4 py-2
                    rounded-md
                    text-slate-900"
                >Chargeable Income
                </h4>
                <div className="flex justify-between">
                    <p className="text-slate-600">Gross Income</p>
                    <p className="">{`${formatCurrency(gross_income)}`}</p>
                </div>

                <div className="
                    flex justify-between
                    pb-5
                    border-b border-slate-200"
                >
                    <span className="text-slate-600">- CPF Relief</span >
                    <span className="">{`${formatCurrency(annual_cpf_relief)}`}</span >
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-800 font-medium">Chargeable Income</span>
                    <span className="">{`${formatCurrency(chargeable_income)}`}</span>
                </div>
            </div>

            <div className="
                flex flex-col 
                gap-4"
            >
                <h4 className="
                    font-semibold
                    bg-slate-50
                    px-4 py-2
                    rounded-md
                    text-slate-900"
                >Tax Calculation
                </h4>
                <div className="flex justify-between">
                    <span className="text-slate-600">{`First ${formatCurrency(min_income)} 
                        @ ${formatPercent(tax_rate)}`}
                    </span>
                    <span className="">{`${formatCurrency(tax_payable)}`}</span>
                </div>

                <div className="
                    flex justify-between 
                    border-b border-slate-200
                    pb-5"
                >
                    <span className="text-slate-600">{`Excess ${formatCurrency(excess_income)} 
                        @ ${formatPercent(tax_rate)}`}
                    </span>
                    <span className="">{`${formatCurrency(excess_tax)}`}</span>
                </div>

                <div className="
                    font-semibold
                    text-slate-800 
                    px-6 py-4
                    bg-slate-50
                    rounded-md"
                >
                    <div className="flex justify-between">
                        <span>Total Tax</span>
                        <span>{`${formatCurrency(total_tax_payable)}`}</span>
                    </div>

                    <div className="flex justify-between mt-4">
                        <span>Effective Tax Rate</span>
                        <span>{`${formatPercent(effective_tax_rate)}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}