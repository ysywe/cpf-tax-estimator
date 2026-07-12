import { formatCurrency, formatPercent } from "../utils/utils";
import ResultAccordion from "./ResultAccordion";
import ContributionSection from "./ContributionSection";

export default function Result({result}) {
    if (!result) return null;

    const { contribution } = result
    const { annual_summary, cpf_rates } = contribution

    const total_rate = cpf_rates.total_rate
    const cpf_liable_wage = annual_summary.cpf_liable_wage
    const cpf_liable_bonus = annual_summary.cpf_liable_bonus
    const total_contribution = annual_summary.total_contribution

    return (
        <div className="
            mx-auto 
            max-w-5xl 
            space-y-6
            p-6"
        >
            <h1 className="text-center my-15 font-bold text-3xl text-slate-600">Results</h1>
            <ResultAccordion
                defaultOpen
                title="Total CPF contributions"
                subtitle={`(${formatPercent(total_rate)} x ${formatCurrency(cpf_liable_wage)}) 
                    + (${formatPercent(total_rate)} x ${formatCurrency(cpf_liable_bonus)})`}
                amount={`${formatCurrency(total_contribution)}`}
            >
                <ContributionSection 
                    result={result}
                />
            </ResultAccordion>

            <ResultAccordion
                title="CPF Allocation"
                subtitle="Allocation into OA, SA, MA and RA"
                amount="2,960.00"
            >
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    Allocation placeholder
                </div>
            </ResultAccordion>

            <ResultAccordion
                title="Income Tax"
                subtitle="Estimated tax payable"
                amount="780.00"
            >
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    Tax placeholder
                </div>
            </ResultAccordion>

        </div>
    );
}