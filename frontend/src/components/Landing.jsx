import MonthYearPicker from "./MonthYearPicker";

export default function Landing({data, setData, onNext}) {
    return (
        <div className="mx-auto px-5 pt-10 pb-20">
            {/* Header */}
            <div className="text-xl text-center font-bold">
                <h2>A tool for employers and employees to estimate your CPF and personal income tax.</h2>
                <p className="text-sm leading-6 mt-2 mb-12 text-slate-600">
                    Use this to estimate your monthly and annual CPF contributions and allocations as well as tax payable.
                </p>
            </div>

            {/* Employee Information */}
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
                <h2 className="font-bold text-left text-2xl">Employee information</h2>
                <p className="text-sm leading-6 my-4 text-slate-600">
                    Select your residency status and birth month year.
                </p>
                <MonthYearPicker
                    label="Birth month & year"
                    value={data.birthMonthYear}
                    onChange={(date) =>
                        setData({
                            ...data,
                            birthMonthYear: date,
                        })
                    }
                />

                <button
                    onClick={onNext}
                    className="
                        py-3
                        w-full rounded-xl
                        bg-sky-600 
                        text-white cursor-pointer
                        hover:bg-sky-700
                        transition delay-100 ease-in-out
    
                ">Next
                </button>
            </form>
        </div>
    );
}