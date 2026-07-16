import { useState } from "react";
import MonthYearPicker from "./MonthYearPicker";

export default function Landing({
    data, 
    setData, 
    onNext
}) {
    const [submitted, setSubmitted] = useState(false);

    const today = new Date();

    const currentMonthYear =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

    const monthYearEmpty = !data.birthMonthYear;

    const monthYearInvalid =
        data.birthMonthYear &&
        (
            data.birthMonthYear < "1900-01" ||
            data.birthMonthYear > currentMonthYear
        );

    const monthYearError =
        monthYearInvalid
            ? "Value must be from Jan 1900 to the current month and year."
            : "";

    const hasError = monthYearEmpty || monthYearInvalid

    return (
        <div className="mx-auto">
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
                <form className="
                    flex flex-col
                    items-center
                    bg-white
                    px-6 py-10  
                    space-y-8" 
                >
                    <h2 className="text-center font-bold text-3xl text-indigo-800">Employee information</h2>
                    <p className="text-left text-sm leading-6 text-slate-600">
                        Select your residency status and birth month year.
                    </p>
                    <MonthYearPicker
                        label="Birth month & year"
                        value={data.birthMonthYear}
                        onChange={(date) => {
                            setData({
                                ...data,
                                birthMonthYear: date,
                            })
                            setSubmitted(false);
                        }}
                        error={monthYearInvalid ? monthYearError : ""}
                    />
                </form>
                <div className="
                    w-full
                    bg-indigo-50
                    py-6 px-10"
                >
                    <button
                        onClick={() => {
                            setSubmitted(true);

                            if (hasError) {
                                return;
                            }
                            onNext(2);
                        }}
                        disabled={submitted && hasError}
                        className="
                            py-3
                            w-full 
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
                    >Next
                    </button>
                </div>
            </div>
        </div>
    );
}