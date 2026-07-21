import InputError from "./InputError";

export default function CurrencyInput({
    label,
    name,
    value,
    onChange,
    onBlur,
    error
}) {
    const showError = error;

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
                    type="text"
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

            <InputError error={error} />
        </div>
    );
}