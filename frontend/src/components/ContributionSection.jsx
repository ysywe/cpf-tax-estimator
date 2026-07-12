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
        <div className="border-slate-200 bg-white">
            <h3 className="
                bg-stone-100
                mb-5 
                px-2
                py-3
                rounded-lg
                font-bold"
            >Share of CPF Contributions
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
                    gap-4
                    border-b border-slate-200 
                    pb-5"
                >
                    <div>
                        <p className="font-medium">
                            Employee's Share
                        </p>

                        <p className="mt-1 text-slate-600">
                            {`(${formatPercent(employer_rate)} x ${formatCurrency(cpf_liable_wage)}) 
                                + (${formatPercent(employee_rate)} x ${formatCurrency(cpf_liable_bonus)})`}
                        </p>
                    </div>

                    <span className="
                        w-full 
                        text-end
                        text-2xl 
                        text-slate-700"
                    >{`${formatCurrency(employee_share)}`}
                    </span>
                </div>

                <div className="
                    flex 
                    flex-col 
                    items-start 
                    justify-between
                    gap-4 
                    border-b border-slate-200 
                    pb-5"
                >
                    <div>
                        <p className="font-medium">
                            Employer's Share
                        </p>

                        <p className="mt-1 text-slate-600">
                            {`(${formatCurrency(total_contribution)} - ${formatCurrency(employee_share)})`}
                        </p>
                    </div>

                    <span className="
                        w-full 
                        text-end
                        text-2xl 
                        text-slate-700"
                    >{`${formatCurrency(employer_share)}`}
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="font-medium">
                        Total CPF Contributions
                    </p>
                    <p className="
                        text-end 
                        text-2xl 
                        font-semibold
                        text-slate-700"
                    >{`${formatCurrency(total_contribution)}`}
                    </p>
                </div>
            </div>
        </div>
    );
}