import { useState } from 'react'

import { fetchEstimate } from '../client';
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
            <form className="
                mx-auto
                my-6
                max-w-90
                border border-slate-200
                rounded-lg
                bg-white
                px-4
                py-8
                shadow-sm
                space-y-8
            ">

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
                            hover:text-black
                            transition delay-100 ease-in-out              
                        ">Back
                    </button>
                    <button
                        onClick={onSubmit}
                        className="
                            py-3
                            w-full rounded-xl
                            bg-sky-600 
                            text-white cursor-pointer
                            hover:bg-sky-700
                            transition delay-100 ease-in-out              
                        ">Calculate
                    </button>
                </div>
            </form>
        </div>
    );
}