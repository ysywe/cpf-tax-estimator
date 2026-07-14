import { formatCurrency, formatPercent } from "../utils/utils";

export default function ContributionSection({result}) {

    const { contribution } = result
    const { annual_summary, cpf_rates } = contribution

    const employee_rate = cpf_rates.employee_rate
    const employer_rate = cpf_rates.employer_rate
    const employee_share = annual_summary.employee_share
    const employer_share = annual_summary.employer_share
    const cpf_liable_wage = annual_summary.cpf_liable_wage
    const cpf_liable_bonus = annual_summary.cpf_liable_bonus
    const total_contribution = annual_summary.total_contribution

    return (
        <div className="
            overflow-hidden
            bg-white 
            rounded-md"
        >
            <h3 className="
                bg-slate-100
                mb-5 
                px-4
                py-3
                rounded-md
                text-slate-800
                font-medium"
            >Share of CPF Contributions
            </h3>

            <div className="
                border border-stone-200
                rounded-md
                space-y-5
                p-6"
            >
                <div className="
                    flex flex-col 
                    gap-3
                    w-full"
                >
                    <h4 className="
                        font-medium
                        bg-slate-50
                        px-4 py-2
                        rounded-md
                        text-slate-900"
                    >Employee's Share
                    </h4>
                    <div className="flex justify-between">
                        <span className="text-slate-600">Annual Ordinary Wages</span>
                        <span className="
                            text-slate-700
                            font-medium"
                        >{`${formatCurrency(cpf_liable_wage)}`}
                        </span>
                    </div>

                    <div className="
                        flex justify-between
                        pb-5
                        border-b border-slate-200"
                    >
                        <span className="text-slate-600">Annual Additional Wages</span>
                        <span className="
                            text-slate-700
                            font-medium"
                        >{`${formatCurrency(cpf_liable_bonus)}`}
                        </span>
                    </div>

                    <div className="
                        flex justify-between 
                        font-bold
                        text-slate-700"
                    >
                        <span>{`Employee's Share @ ${formatPercent(employee_rate)}`}</span>
                        <span>{`${formatCurrency(employee_share)}`}</span>
                    </div>
                </div>

                <div className="
                    flex flex-col 
                    gap-4"
                >
                    <h4 className="
                        font-medium
                        bg-slate-50
                        px-4 py-2
                        rounded-md
                        text-slate-900"
                    >Employer's Share
                    </h4>

                    <div className="flex justify-between">
                        <span className="text-slate-600">Total Contribution -</span>
                        <span className="
                            text-slate-700
                            font-medium"
                        >{`${formatCurrency(total_contribution)}`}
                        </span>
                    </div>

                    <div className="
                        flex justify-between
                        pb-5
                        border-b border-slate-200"
                    >
                        <span className="text-slate-600">Employee's Share</span>
                        <span className="
                            text-slate-700
                            font-medium"
                        >{`${formatCurrency(employee_share)}`}
                        </span>
                    </div>

                    <div className="
                        flex justify-between 
                        font-bold
                        text-slate-700"
                    >
                        <span>Employer's Share</span>
                        <span>{`${formatCurrency(employer_share)}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}