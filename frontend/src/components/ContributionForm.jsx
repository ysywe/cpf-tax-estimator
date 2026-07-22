import { useState } from 'react'

import MonthYearPicker from "./ui/MonthYearPicker/MonthYearPicker";
import CurrencyInput from "./ui/CurrencyInput";

export default function ContributionForm({
    data, 
    setData, 
    birthMonthYear,
    onBack, 
    onSubmit
}) {
    const [submitted, setSubmitted] = useState(false);
    const [wageTouched, setWageTouched] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const MIN_CONTRIBUTION_MONTH = "2015-01";
    const today = new Date();
    const MAX_CONTRIBUTION_MONTH = `${today.getFullYear()}-12`;

    const totalWages =
        Number(data.ordinaryWages || 0) +
        Number(data.additionalWages || 0);

    const hasAnyWage =
        data.ordinaryWages !== "" ||
        data.additionalWages !== "";

    const wageInvalid =
        hasAnyWage &&
        totalWages <= 50;

    const monthYearOutofBound =
        data.contributionMonthYear &&
    (
        data.contributionMonthYear < MIN_CONTRIBUTION_MONTH ||
        data.contributionMonthYear > MAX_CONTRIBUTION_MONTH
    );

    const monthYearInvalid =
        data.contributionMonthYear &&
        birthMonthYear >= data.contributionMonthYear;

    const canSubmit =
        hasAnyWage &&
        !monthYearInvalid &&
        !monthYearOutofBound &&
        !wageInvalid;

    const monthYearError =
    monthYearInvalid
        ? "Contribution month must be after the birth month and year."
        : monthYearOutofBound
            ? `Contribution month must be between Jan 2015 and Dec ${today.getFullYear()}.`
            : "";

    const wageError = 
        wageInvalid
        ? "The sum Ordinary wages and additional wages must be more than $50."
        : "";

    const hasError = monthYearInvalid || monthYearOutofBound || wageInvalid

    const wageFields = [
        {
            label: "Ordinary Wages",
            name: "ordinaryWages",
        },
        {
            label: "Additional Wages",
            name: "additionalWages",
        },
    ];

    return (
        <div className="mx-auto pb-15">
            {/* Header */}
            <div className="text-xl text-center font-bold my-15">
                <h2>A tool for employers and employees to estimate your CPF and personal income tax.</h2>
                <p className="text-sm font-normal leading-6 mt-2 text-slate-500">
                    Use this to estimate your monthly and annual CPF contributions and allocations as well as tax payable.
                </p>
            </div>

            <div className="
                flex flex-col
                w-full
                mx-auto
                rounded-lg
                sm:w-xl
                lg:w-2xl"
            >
                <form 
                    id="cpf-form"
                    onSubmit={(e) => {
                        e.preventDefault();

                        setSubmitted(true);
                        if (hasError) {
                            return;
                        }
                        onSubmit();
                    }}
                    className="
                        flex flex-col
                        items-center
                        bg-white
                        px-6 py-10              
                        space-y-6"        
                >
                    <h2 className="font-bold text-left text-2xl text-indigo-800">Contribution details</h2>
                    <p className="text-sm leading-6 text-slate-600">
                        Select your current contribution period and enter the ordinary and additional wages.
                    </p>
                    <MonthYearPicker
                        label="Contribution month and year"
                        value={data.contributionMonthYear}
                        onChange={(date) => {
                            setData({
                                ...data,
                                contributionMonthYear: date,
                            })
                            setSubmitted(false);
                        }}
                        error={monthYearError}
                    />

                    <div className="
                        w-sm
                        pt-2
                        border-t border-slate-200"
                    >
                        <h4>Wages</h4>
                        <p className="
                            mt-2
                            font-light 
                            italic
                            text-slate-400"
                        >
                            Sum of Ordinary and Additional wages must be more than $50 to attract CPF contributions. You can check&nbsp;
                            <a className="
                                underline 
                                text-indigo-800 
                                font-semibold
                                hover:text-indigo-700"
                                href="https://www.cpf.gov.sg/employer/employer-obligations/what-payments-attract-cpf-contributions#section-header-1659668379"

                            >what payments attract CPF and how they are classified
                            </a>.
                        </p>
                    </div>

                    {wageFields.map((field) => (
                        <CurrencyInput
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={data[field.name]}
                            onChange={(e) => {
                                handleInputChange(e)
                                setSubmitted(false)
                                setWageTouched(false);
                            }}
                            onBlur={() => setWageTouched(true)}
                            error={wageTouched && wageInvalid ? wageError : ""}
                        />
                    ))}

                </form>
                <div className="
                    flex justify-between
                    w-full
                    bg-indigo-50
                    py-6 px-3
                    sm:px-15"
                >
                    <button
                        onClick={onBack}
                        className="
                            py-3                           
                            min-w-40
                            rounded-full
                            border border-indigo-800
                            text-indigo-800
                            font-bold
                            cursor-pointer
                            hover:bg-slate-200"                     
                    >Back
                    </button>
                    <button
                        form="cpf-form"
                        type="submit"
                        disabled={!canSubmit}
                        className="
                            p-3                    
                            min-w-40
                            rounded-full
                            bg-indigo-800
                            text-white 
                            font-bold
                            cursor-pointer
                            hover:bg-indigo-700
                            
                            disabled:cursor-default
                            disabled:bg-slate-300
                            disabled:text-slate-500
                            disabled:hover:bg-slate-300" 
                    >Calculate
                    </button>
                </div>
            </div>
        </div>
    );
}