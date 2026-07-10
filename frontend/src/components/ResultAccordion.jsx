import { useState } from "react";

export default function ResultAccordion({
    title,
    subtitle,
    amount,
    defaultOpen = false,
    children,
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <section className="overflow-hidden bg-white shadow-sm">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    flex flex-col
                    gap-6
                    w-full
                    text-left
                    px-6
                    py-4
                    transition
                    cursor-pointer"
            >
                <div>
                    <h2 className="font-bold text-slate-900">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-slate-500">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2 justify-end">
                    <span className="text-2xl font-semibold text-slate-700">
                        ${amount}
                    </span>

                    <div
                        className={`
                            flex 
                            h-10 w-10 
                            items-center 
                            justify-center
                            rounded-full bg-slate-100
                            hover:bg-indigo-200
                            transition-transform
                            ${open ? "rotate-180" : ""}
                        `}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="size-5 text-indigo-800"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="m4.5 15.75 7.5-7.5 7.5 7.5" 
                            />
                        </svg>

                    </div>
                </div>
            </button>

            {open && (
                <div className="px-6 pb-6">
                    {children}
                </div>
            )}
        </section>
    );
}