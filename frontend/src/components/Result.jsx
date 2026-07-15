import { formatCurrency, formatPercent } from "../utils/utils";
import ResultAccordion from "./ResultAccordion";
import ContributionSection from "./ContributionSection";
import AllocationSection from "./AllocationSection";
import TaxSection from "./TaxSection";
import InputSummary from "./InputSummary";

export default function Result({ result, inputs }) {
    if (!result) return null;

    const { contribution, tax } = result
    const { annual_summary, cpf_rates } = contribution
    const { total_tax_payable } = tax

    const total_rate = cpf_rates.total_rate
    const cpf_liable_wage = annual_summary.cpf_liable_wage
    const cpf_liable_bonus = annual_summary.cpf_liable_bonus
    const total_contribution = annual_summary.total_contribution
    
    return (
        <div className="
            mx-auto 
            max-w-5xl 
            space-y-6
            p-8
            sm:max-w-3xl"
        >   
            <ResultAccordion
                defaultOpen
                title="Calculation Summary"
                subtitle=""
                amount=""
                variant="summary"
            >
                <InputSummary 
                    inputs={inputs} 
                    result={result}
                />
            </ResultAccordion>

            <h1 className="
                text-center 
                mt-20 mb-5
                font-bold 
                text-3xl 
                text-slate-600"
            >Results
            </h1>
            
            <ResultAccordion
                title="Total CPF contributions"
                subtitle="Employee and Employer CPF contribution"
                amount={`${formatCurrency(total_contribution)}`}
            >
                <ContributionSection 
                    result={result}
                />
            </ResultAccordion>

            <ResultAccordion
                title="CPF Allocation"
                subtitle="Allocation of CPF accounts"
                amount=""
            >
                <AllocationSection
                    result={result}
                />
            </ResultAccordion>

            <ResultAccordion
                title="Income Tax"
                subtitle="Estimated tax payable"
                amount={`${formatCurrency(total_tax_payable)}`}
            >  
                <TaxSection
                    result={result}
                />
            </ResultAccordion>

        </div>
    );
}