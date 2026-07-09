import ResultCard from "./ResultCard"

export default function FormResult({result, onBack}) {
    if (!result) return null;

    const contribution = result.CPFBreakdownResponse.contribution_data;

    return (
        <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
            {/* Header */}
            <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                    Results
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                    CPF Contribution Summary
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                    Estimated CPF contributions based on the information you
                    provided.
                </p>
                <button
                    onClick={onBack}
                    className="
                        mt-6
                        px-4
                        py-3
                        rounded-xl
                        bg-slate-100
                        text-slate-400
                        cursor-pointer
                        hover:text-indigo-800
                        transition delay-100 ease-in-out"                     
                    >Back
                </button>
            </div>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-3 p-5 mt-8">
                <ResultCard
                    title="Employee Share"
                    value={contribution.monthly_summary.employee_share}
                />

                <ResultCard
                    title="Employer Share"
                    value={contribution.monthly_summary.employer_share}
                />

                <ResultCard
                    title="Annual CPF"
                    value={contribution.annual_summary.total_contribution}
                    highlight
                />
            </div>
        </section>
    )
}