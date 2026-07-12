import MonthYearPicker from "./MonthYearPicker";

export default function Landing({data, setData, onNext}) {
    return (
        <div className="mx-auto pt-10 pb-20">
            {/* Header */}
            <div className="text-xl text-center font-bold mb-12">
                <h2>A tool for employers and employees to estimate your CPF and personal income tax.</h2>
                <p className="text-sm leading-6 mt-2 text-slate-600">
                    Use this to estimate your monthly and annual CPF contributions and allocations as well as tax payable.
                </p>
            </div>

            {/* Employee Information Form */}
            <form className="
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
                <h2 className="font-bold text-2xl text-indigo-800">Employee information</h2>
                <p className="text-sm leading-6 text-slate-600">
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
            </form>
             <div className="
                max-w-5xl
                mx-auto
                rounded-b-lg
                bg-indigo-50
                p-6
                sm:max-w-3xl"
            >
                <button
                    onClick={onNext}
                    className="
                        py-3
                        w-full 
                        rounded-full
                        bg-indigo-800
                        text-white 
                        font-bold
                        cursor-pointer
                        hover:bg-indigo-700"                     
                >Next
                </button>
            </div>
        </div>
    );
}