
export default function CitizenshipRadioGroup({
    options,
    value,
    onChange,
}) {
    return (
        <div className="space-y-2 max-w-sm">
            <label className="block font-light">
                Citizenship Status
            </label>
            <p className="
                text-slate-400 
                font-light
                italic"
            >Contribution rates for Permanent Residents are based on their&nbsp;
                <a className="
                    underline 
                    text-indigo-800 
                    font-semibold
                    hover:text-indigo-700" 
                    href="https://www.cpf.gov.sg/employer/employer-obligations/how-much-cpf-contributions-to-pay#section-header-1452036554"
                    target="_blank"
                >number of years
                </a>.
            </p>

            {options.map((option) => (
                <label
                    key={option.value}
                    className={`
                        flex items-center 
                        gap-4 
                        w-sm
                        rounded-lg
                        border 
                        px-4 py-3
                        cursor-pointer 
                        ${
                            value === option.value
                                ? "border-sky-300 bg-slate-50"
                                : "border-slate-300 hover:border-sky-300"
                        }
                    `}
                >
                    <input
                        type="radio"
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                        className="
                            shrink-0
                            h-5 w-5 
                            accent-indigo-700
                            cursor-pointer
                        "
                    />

                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
}