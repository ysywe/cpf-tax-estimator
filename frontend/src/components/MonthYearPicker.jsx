import { useState, useRef, useEffect } from "react";

const MONTHS = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec",
];

export default function MonthYearPicker({
    label,
    value,
    onChange,
}) {
    const today = new Date();

    const selectedYear = value
        ? Number(value.split("-")[0])
        : today.getFullYear();

    const selectedMonth = value
        ? Number(value.split("-")[1])
        : today.getMonth() + 1;

    const [year, setYear] = useState(selectedYear);
    const [view, setView] = useState("month");
    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        if (value) {setYear(Number(value.split("-")[0]));} 
        else {setYear(today.getFullYear());}
    }, [value]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setView("month");
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
    }, []);

    const handleMonthSelect = (monthIndex) => {
        onChange(
            `${year}-${String(monthIndex + 1).padStart(2, "0")}`
        );

        setOpen(false);
        setView("month");
    };

    const handleClear = () => {
        onChange("");
        setYear(today.getFullYear());
        setView("month");
        setOpen(false);
    };

    // Decade Picker 

    const decadeStart = Math.floor(year / 10) * 10;
    const decadeYears = [];
    for (let i = -1; i <= 10; i++) {
        decadeYears.push(decadeStart + i);
    }

    return (
        <div ref={ref} className="relative">
            <label className="mb-2 block">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="
                    flex w-full items-center justify-between
                    rounded-xl border border-slate-300
                    px-4 py-3
                    hover:border-sky-300
                    transition"     
            >
                <span className="text-sm text-slate-600">
                    {value
                        ? `${String(selectedMonth).padStart(2, "0")}/${selectedYear}`
                        : "MM/YYYY"}
                </span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-sky-600 cursor-pointer"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" 
                    />
                </svg>
            </button>

            {open && (
                <div
                    className="
                        absolute
                        left-0
                        bottom-13
                        mt-2
                        z-50
                        w-full
                        sm:max-w-120
                        rounded-sm
                        border
                        border-sky-200
                        bg-white
                        p-4
                        sm:p-5
                        shadow-md"                
                >
                    {/* PICKER HEADER */}

                    <div className="mb-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() =>
                                view === "month"
                                    ? setYear(year - 1)
                                    : setYear(year - 10)
                            }
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="
                                    size-5
                                    text-slate-500
                                    hover:text-sky-600
                                    cursor-pointer"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" 
                                />
                            </svg>

                        </button>

                        <button
                            type="button"
                            onClick={() => setView("year")}
                            className="
                                rounded-full
                                px-5
                                py-1
                                font-semibold
                                cursor-pointer
                                hover:bg-slate-100
                            "
                        >
                            {view === "month"
                                ? year
                                : `${decadeStart}-${decadeStart + 9}`}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                view === "month"
                                    ? setYear(year + 1)
                                    : setYear(year + 10)
                            }
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="
                                    size-5
                                    text-slate-500
                                    hover:text-sky-600
                                    cursor-pointer"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" 
                                />
                            </svg>

                        </button>
                    </div>

                    {/* MONTH PICKER */}

                    {view === "month" && (
                        <>
                            <div className="grid grid-cols-3 gap-3">
                                {MONTHS.map((month, index) => {
                                    const active =
                                        year === selectedYear &&
                                        index + 1 === selectedMonth;

                                    return (
                                        <button
                                            key={month}
                                            type="button"
                                            onClick={() =>
                                                handleMonthSelect(index)
                                            }
                                            className={`
                                                rounded-full
                                                py-2
                                                cursor-pointer
                                                ${
                                                    active
                                                        ? "bg-indigo-800 text-white"
                                                        : "hover:bg-slate-100"
                                                }
                                            `}
                                        >
                                            {month}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={handleClear}
                                className="
                                    mt-8
                                    text-indigo-800
                                    cursor-pointer
                                    hover:text-indigo-600
                                    flex gap-2 items-center"
                            >Clear Selection
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className="size-4"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" 
                                    />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* DECADE PICKER */}

                    {view === "year" && (
                        <>
                            <div className="grid grid-cols-3 gap-4">
                                {decadeYears.map((y, index) => {
                                    const outside =
                                        index === 0 || index === 11;

                                    return (
                                        <button
                                            key={y}
                                            type="button"
                                            onClick={() => {
                                                setYear(y);
                                                setView("month");
                                            }}
                                            className={`
                                                rounded-full
                                                py-2
                                                cursor-pointer
                                                ${
                                                    outside
                                                        ? "text-slate-600"
                                                        : ""
                                                }
                                                ${
                                                    y === year
                                                        ? "bg-indigo-800 text-white"
                                                        : "hover:bg-slate-100"
                                                }
                                            `}
                                        >
                                            {y}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={handleClear}
                                className="
                                    mt-8       
                                    text-indigo-800
                                    cursor-pointer
                                    hover:text-indigo-600
                                    flex gap-2 items-center"
                            >Clear Selection
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className="size-4"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" 
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}