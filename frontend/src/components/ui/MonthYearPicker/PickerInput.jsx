import { formatMonthYear } from "../../../utils/utils";

export default function PickerInput({
    label,
    value,
    selectedMonth,
    selectedYear,
    showError,
    open,
    onOpen,
}) {
    return (
        <>
            <label className="mb-2 block font-light">
                {label}
            </label>

            <button
                type="button"
                onClick={onOpen}
                className={`
                    flex items-center justify-between
                    w-sm
                    rounded-lg border border-slate-300
                    px-4 
                    py-3
                    ${
                        showError
                            ? "border-red-500 ring-1 ring-red-500"
                            : open
                                ? "border-sky-500 ring-1 ring-sky-500"
                                : "border-slate-300 hover:border-sky-300"
                    }
                `}   
            >
                <span 
                    className={
                        value
                            ? "font-medium text-slate-800"
                            : "font-light text-slate-500"
                    }
                    >
                    {value
                        ? `${formatMonthYear(value)}`
                        : "MM/YYYY"    
                    }
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
        </>
    )
}