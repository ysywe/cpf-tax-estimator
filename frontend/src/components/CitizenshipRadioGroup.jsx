
export default function CitizenshipRadioGroup({
    options,
    value,
    onChange,
}) {
    return (
        <div className="space-y-3">
            <label className="block font-light">
                Citizenship Status
            </label>

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