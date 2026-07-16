export default function CurrencyInput({
    label,
    name,
    value,
    onChange,
    onBlur,
    error
}) {
    const showError = !!error;

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="mb-2 block font-light">
                {label}
            </label>

            <div
                className="
                    flex items-center
                    rounded-lg border border-slate-300
                    bg-white
                    px-4 py-3
                    w-sm
                    hover:border-sky-300"
            >
                <span className="mr-4 text-slate-500 select-none">
                    SGD
                </span>

                <input
                    id={name}
                    type="number"
                    step="0.01"
                    min="0"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="00.00"
                    className="
                        flex-1
                        bg-transparent
                        outline-none
                        text-slate-800
                        font-medium
                        placeholder:text-slate-400 
                        placeholder:font-light
                        [appearance:textfield]"
                />
            </div>

            {showError && (
                <div className="
                    mt-2
                    w-sm
                    text-sm
                    flex items-center
                    gap-1
                    text-red-600
                    italic"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6 shrink-0"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}