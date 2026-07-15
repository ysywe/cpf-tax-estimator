import { useState } from 'react'

import MonthYearPicker from "./MonthYearPicker";
import CurrencyInput from "./CurrencyInput";

export default function ContributionForm({data, setData, onBack, onSubmit}) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    return (
        <div className="mx-auto pb-20 pt-15">
            {/* Header */}
            <div className="text-xl text-center font-bold mb-20">
                <h2>A tool for employers and employees to estimate your CPF and personal income tax.</h2>
                <p className="text-sm leading-6 mt-2 text-slate-600">
                    Use this to estimate your monthly and annual CPF contributions and allocations as well as tax payable.
                </p>
            </div>

            {/* CPF Contribution Form */}
            <form 
                id="cpf-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="
                    flex flex-col items-center
                    mx-auto
                    w-full
                    border border-none
                    rounded-t-lg
                    bg-white
                    p-6
                    sm:w-3xl sm:p-15
                    space-y-8"        
            >
                <h2 className="font-bold text-left text-2xl text-indigo-800">Contribution details</h2>
                <p className="text-sm leading-6 text-slate-600">
                    Select your current contribution period and enter the ordinary and additional wages.
                </p>
                <MonthYearPicker
                    label="Contribution month and year"
                    value={data.contributionMonthYear}
                    onChange={(date) =>
                        setData({
                            ...data,
                            contributionMonthYear: date,
                        })
                    }
                />

                <CurrencyInput
                    label="Ordinary Wages"
                    name="ordinaryWages"
                    value={data.ordinaryWages}
                    onChange={handleInputChange}
                />
                <CurrencyInput
                    label="Additional Wages"
                    name="additionalWages"
                    value={data.additionalWages}
                    onChange={handleInputChange}
                />
            </form>
            <div className="
                max-w-5xl
                mx-auto
                flex flex-col gap-4
                rounded-b-lg
                bg-indigo-50
                p-6
                sm:w-3xl sm:flex-row sm:justify-between"
            >
                <button
                    onClick={onBack}
                    className="
                        py-3
                        w-full 
                        sm:w-40
                        rounded-full
                        border border-indigo-800
                        text-indigo-800
                        font-bold
                        cursor-pointer
                        hover:bg-slate-200
                        transition delay-100 ease-in-out"                     
                >Back
                </button>
                <button
                    form="cpf-form"
                    type="submit"
                    className="
                        p-3
                        w-full
                        sm:w-40
                        rounded-full
                        bg-indigo-800
                        text-white 
                        font-bold
                        cursor-pointer
                        hover:bg-indigo-700 
                        transition delay-100 ease-in-out"             
                >Calculate
                </button>
            </div>
        </div>
    );
}