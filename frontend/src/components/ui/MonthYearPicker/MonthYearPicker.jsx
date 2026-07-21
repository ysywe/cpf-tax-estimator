import { useState, useRef, useEffect } from "react";
import { formatMonthYear } from "../../../utils/utils";
import PickerInput from "./PickerInput";
import PickerHeader from "./PickerHeader";
import MonthGrid from "./MonthGrid";
import YearGrid from "./YearGrid";
import InputError from "../InputError";

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
    error,
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
    const [placement, setPlacement] = useState("bottom");

    const ref = useRef(null);
    const pickerRef = useRef(null);

    useEffect(() => {
        if (value) {
            setYear(Number(value.split("-")[0]));
        } else {
            setYear(today.getFullYear());
        }
    }, [value]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setView("month");
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const pickerHeight = pickerRef.current?.getBoundingClientRect().height ?? 420;

    const handleOpen = () => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < pickerHeight && spaceAbove > spaceBelow) {
            setPlacement("top");
        } else {
            setPlacement("bottom");
        }
        setOpen(true);
    };

    const handleMonthSelect = (monthIndex) => {
        onChange(
            `${year}-${String(monthIndex + 1).padStart(2, "0")}`
        );
        setOpen(false);
        setView("month");
    };

    const handleYearSelect = (selectedYear) => {
        setYear(selectedYear);
        setView("month");
    }

    const handleClear = () => {
        onChange("");
        setYear(today.getFullYear());
        setView("month");
        setOpen(false);
    };

    const handlePrevious = () => {
        if (view === "month") {
            setYear((prev) => prev - 1);
        } else {
            setYear((prev) => prev - 10);
        }
    };

    const handleNext = () => {
        if (view === "month") {
            setYear((prev) => prev + 1);
        } else {
            setYear((prev) => prev + 10);
        }
    };

    const decadeStart = Math.floor(year / 10) * 10;
    const decadeYears = Array.from(
        { length: 12 },
        (_, index) => decadeStart - 1 + index
    );

    const showError = error && !open;

    return (
        <div 
            ref={ref} 
            className="relative"
        >
            <PickerInput
                label={label}
                value={value}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                showError={showError}
                open={open}
                onOpen={handleOpen}
            />

            <InputError error={showError ? error : ""} />

            {open && (
                <div
                    ref={pickerRef}
                    className={`
                        absolute
                        left-0
                        z-500
                        w-full
                        sm:max-w-90
                        rounded-sm
                        border
                        border-sky-200
                        bg-white
                        p-5
                        shadow-sm
                        ${
                            placement === "top"
                            ? "bottom-14" 
                            : "top-22"
                        }
                    `}               
                >
                    <PickerHeader
                        year={year}
                        view={view}
                        decadeStart={decadeStart}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        onToggleView={() =>
                            setView(prev =>
                                prev === "month"
                                    ? "year"
                                    : "month"
                            )
                        }
                    />

                    {view === "month" ? (
                        <MonthGrid
                            months={MONTHS}
                            year={year}
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            onMonthSelect={handleMonthSelect}
                        />
                    ) : (
                        <YearGrid
                            year={year}
                            decadeYears={decadeYears}
                            onYearSelect={handleYearSelect}
                        />
                    )}

                    <button
                        type="button"
                        onClick={handleClear}
                        className="
                            mt-8
                            text-indigo-800
                            cursor-pointer
                            hover:text-indigo-600
                            flex gap-2 items-center
                            font-semibold"
                    >Clear Selection
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="size-5"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" 
                            />
                        </svg>
                    </button>   
                </div>
            )}
        </div>
    );
}