import MonthYearPicker from "./MonthYearPicker";

export default function Landing({data, setData, onNext}) {
    return (
        <div className="mx-auto px-5 pt-10 pb-20">
            {/* Header */}
            <div className="text-xl text-center font-bold mb-12">
                <h2>A tool for employers and employees to estimate your CPF and personal income tax.</h2>
                <p className="text-sm leading-6 mt-2 text-slate-600">
                    Use this to estimate your monthly and annual CPF contributions and allocations as well as tax payable.
                </p>
            </div>

            {/* Employee Information */}
            <form className="
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
                        bg-indigo-800
                        text-white 
                        cursor-pointer
                        hover:bg-indigo-700
                        transition delay-100 ease-in-out"
                >Next
                </button>
            </form>
        </div>
    );
}