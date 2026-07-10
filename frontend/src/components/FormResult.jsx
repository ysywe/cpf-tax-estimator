import ResultAccordion from "./ResultAccordion";
import ContributionSection from "./ContributionSection";

export default function FormResult() {
    return (
        <div className="mx-auto max-w-5xl space-y-6">

            <ResultAccordion
                defaultOpen
                title="Total CPF contributions"
                subtitle="(37% x $8,000.00) + (37% x $213,123.00)"
                amount="2,960.00"
            >
                <ContributionSection />
            </ResultAccordion>

            <ResultAccordion
                title="CPF Allocation"
                subtitle="Allocation into OA, SA and MA"
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