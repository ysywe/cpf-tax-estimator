
export default function ResultCard({title, value, highlight = false}) {
    const formattedValue = Number(value || 0).toLocaleString("en-SG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div
            className={`
                relative 
                overflow-hidden 
                rounded-2xl border
                max-w-xs
                p-6 
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-xl
                border-slate-200 
                bg-white 
                shadow-sm"
            `}
        >
            <div className="
                absolute left-0 top-0 h-1 w-full
                 bg-indigo-600"
            />

            <div className="space-y-2">
                <p className="text-slate-500">
                    {title}
                </p>

                <div className="flex items-end gap-1">
                    <span className="
                        text-lg font-medium 
                         text-slate-500"
                    >
                        $
                    </span>

                    <h3 className="text-4xl font-bold tracking-tight">
                        {formattedValue}
                    </h3>
                </div>
            </div>
        </div>
    );
}