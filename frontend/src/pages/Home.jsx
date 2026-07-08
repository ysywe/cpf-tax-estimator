import { useState } from "react";
import Landing from "../components/Landing";
import ContributionForm from "../components/ContributionForm";

export default function Home() {
    const [step, setStep] = useState(1);

    const [employeeInfo, setEmployeeInfo] = useState({
        residency: "",
        birthMonthYear: "",
    });

    const [calculationData, setCalculationData] = useState({
        contributionMonthYear: "",
        ordinaryWages: "",
        additionalWages: "",
    });

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
                    data={calculationData}
                    setData={setCalculationData}
                    onBack={() => setStep(1)}
                    onSubmit={() => setStep(3)}
                />
            )}
        </>
    );
}