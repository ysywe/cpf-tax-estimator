import { useState } from 'react'

import MonthYearPicker from "./MonthYearPicker";
import CurrencyInput from "./CurrencyInput";

export default function ContributionForm({
    data, 
    setData, 
    birthMonthYear,
    onBack, 
    onSubmit
}) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const [submitted, setSubmitted] = useState(false);
    const [wageTouched, setWageTouched] = useState(false);

    const monthYearEmpty = !data.contributionMonthYear;

    const monthYearInvalid =
        data.contributionMonthYear &&
            birthMonthYear > data.contributionMonthYear

    const monthYearError =
        monthYearInvalid
            ? "Value must be more than birth month and year."
            : "";

    const wageInvalid = 
        (data.ordinaryWages !== "" || data.additionalWages !== "")
        && (Number(data.ordinaryWages) + Number(data.additionalWages) <= 50)
    
    const wageError = 
        wageInvalid
        ? "The sum Ordinary wages and additional wages must be more than $50."
        : "";

    const hasError = monthYearEmpty || monthYearInvalid || wageInvalid

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
                        space-y-8"        
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
                        error={monthYearInvalid ? monthYearError : ""}
                    />

                    <CurrencyInput
                        label="Ordinary Wages"
                        name="ordinaryWages"
                        value={data.ordinaryWages}
                        onChange={(e) => {
                            handleInputChange(e)
                            setSubmitted(false)
                            setWageTouched(false);
                        }}
                        onBlur={() => setWageTouched(true)}
                        error={wageTouched && wageInvalid ? wageError : ""}
                    />
                    <CurrencyInput
                        label="Additional Wages"
                        name="additionalWages"
                        value={data.additionalWages}
                        onChange={(e) => {
                            handleInputChange(e)
                            setSubmitted(false)
                            setWageTouched(false);
                        }}
                        onBlur={() => setWageTouched(true)}
                        error={wageTouched && wageInvalid ? wageError : ""}
                    />
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
                        disabled={submitted && hasError}
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