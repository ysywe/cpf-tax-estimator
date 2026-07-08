import { useState, useRef, useEffect } from "react";

const MONTHS = [
    "Jan","Feb","Mar",
    "Apr","May","Jun",
    "Jul","Aug","Sep",
    "Oct","Nov","Dec"
];

export default function MonthYearPicker({label, value, onChange}) {
    const today = new Date();

    const initialYear = value
        ? Number(value.split("-")[0])
        : today.getFullYear();

    const initialMonth = value
        ? Number(value.split("-")[1])
        : null;

    const [year, setYear] = useState(initialYear);
    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const clickOutside = (e) => {
            if (
                ref.current &&
                !ref.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                clickOutside
            );
    }, []);

    const handleSelect = (month) => {
        onChange(
            `${year}-${String(month + 1).padStart(2, "0")}`
        );
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <label className="mb-2 block">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    flex w-full items-center justify-between
                    rounded-xl border border-slate-300
                    px-4 py-3
                    hover:border-sky-300
            ">
                <span className="text-slate-600 text-sm">
                    {value
                        ? `${value.split("-")[1]}/${value.split("-")[0]}`
                        : "MM/YYYY"}
                </span>
                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-sky-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                </div>
            </button>

            {open && (
                <div className="
                    absolute
                    bottom-13
                    left-0
                    z-50
                    w-full
                    rounded-lg border border-sky-200
                    bg-white
                    p-5
                    shadow-xl                   
                ">
                    <div className="mb-6 flex items-center justify-between">

                        <button type="button" onClick={() => setYear(year - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer size-5 text-gray-400 hover:text-sky-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <span className="font-semibold">
                            {year}
                        </span>

                        <button type="button" onClick={() => setYear(year + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer size-5 text-gray-400 hover:text-sky-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {MONTHS.map((month, index) => {
                            const selected =
                                initialYear === year &&
                                initialMonth === index + 1;

                            return (
                                <button
                                    key={month}
                                    type="button"
                                    onClick={() =>
                                        handleSelect(index)
                                    }
                                    className={
                                        selected
                                            ? "rounded-full bg-sky-600 py-2 text-white"
                                            : "cursor-pointer rounded-full py-2 hover:bg-gray-100"
                                    }
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        className="mt-6 text-gray-400 hover:text-sky-600 cursor-pointer"
                        onClick={() => onChange("")}
                    >Clear Selection
                    </button>
                </div>
            )}
        </div>
    );
}