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
        <div className="mx-auto px-5 pt-10 pb-20">
            {/* Header */}
            <div className="text-xl text-center font-bold mb-12">
                <h2>A tool for employers and employees to estimate your CPF and personal income tax.</h2>
                <p className="text-sm leading-6 mt-2 text-slate-600">
                    Use this to estimate your monthly and annual CPF contributions and allocations as well as tax payable.
                </p>
            </div>

            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="
                    w-full
                    max-w-xl
                    mx-auto
                    border border-slate-200
                    rounded-2xl
                    bg-white
                    p-6
                    sm:p-8
                    lg:p-10
                    shadow-sm
                    space-y-8"        
            >
                <h2 className="font-bold text-left text-2xl">Contribution details</h2>
                <p className="text-sm leading-6 my-4 text-slate-600">
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

                <div className="flex justify-between gap-30">
                    <button
                        onClick={onBack}
                        className="
                            py-3
                            w-full rounded-xl
                            bg-slate-100
                            text-slate-400
                            cursor-pointer
                            hover:text-slate-600
                            transition delay-100 ease-in-out"                     
                    >Back
                    </button>
                    <button
                        type="submit"
                        className="
                            py-3
                            w-full rounded-xl
                            bg-indigo-800
                            text-white 
                            cursor-pointer
                            hover:bg-indigo-700 
                            transition delay-100 ease-in-out"             
                    >Calculate
                    </button>
                </div>
            </form>
        </div>
    );
}