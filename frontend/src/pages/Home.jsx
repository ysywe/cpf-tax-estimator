import { useState } from "react";

import { fetchEstimate } from "../client"
import Landing from "../components/Landing";
import ContributionForm from "../components/ContributionForm";
import Result from "../components/Result"

export default function Home() {
    const [step, setStep] = useState(1);

    const [employeeInfo, setEmployeeInfo] = useState({
        residency: "",
        birthMonthYear: "",
    });

    const [contributionData, setContributionData] = useState({
        contributionMonthYear: "",
        ordinaryWages: "",
        additionalWages: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const calculateAge = (birthMonthYear, contributionMonthYear) => {
        const birthDate = new Date(`${birthMonthYear}-01`);
        const incomeDate = new Date(`${contributionMonthYear}-01`);

        let age = incomeDate.getFullYear() - birthDate.getFullYear();

        if (incomeDate.getMonth() < birthDate.getMonth()) {
            age--;
        }
        return age;
    }
  
    const handleCalculation = async () => {
        if (
            !employeeInfo.birthMonthYear ||
            !contributionData.contributionMonthYear ||
            contributionData.ordinaryWages === "" ||
            contributionData.additionalWages === ""
        ) {
            setError("Please complete all fields.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            // Calculate age based on contribution month
            const age = calculateAge(
                employeeInfo.birthMonthYear, 
                contributionData.contributionMonthYear
            )

            const payload = {
                monthly_income: Number(contributionData.ordinaryWages),
                additional_income: Number(contributionData.additionalWages),
                age,
                income_date: `${contributionData.contributionMonthYear}-01`,
            };

            const response = await fetchEstimate(payload);

            setResult({
                contribution: response.CPFBreakdownResponse.contribution_data,
                allocation: response.CPFBreakdownResponse.allocation_data,
                tax: response.TaxBreakdownResponse
            });
            setStep(3);
        } catch (err) {
            setError(err.message || "Calculation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {step === 1 && (
                <Landing
                    data={employeeInfo}
                    setData={setEmployeeInfo}
                    onNext={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <ContributionForm
                    data={contributionData}
                    setData={setContributionData}
                    onBack={() => setStep(1)}
                    onSubmit={handleCalculation}
                    loading={loading}
                    error={error}
                />
            )}

            {step === 3 && (
                <Result
                    result={result}
                    inputs = {{
                        ...employeeInfo,
                        ...contributionData
                    }}
                />
            )}
        </>
    );
}