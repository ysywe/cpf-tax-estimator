export default function CurrencyInput({
    label,
    name,
    value,
    onChange,
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="mb-2 block">
                {label}
            </label>

            <div
                className="
                    flex items-center
                    rounded-xl border border-slate-300
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
                    placeholder="Enter amount"
                    className="
                        flex-1
                        bg-transparent
                        outline-none
                        text-slate-800
                        placeholder:text-slate-300
                        placeholder:font-light
                        [appearance:textfield]"
                />
            </div>
        </div>
    );
}