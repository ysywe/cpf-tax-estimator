export default function PickerHeader({
    year,
    view,
    decadeStart,
    onPrevious,
    onNext,
    onToggleView,
}) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <button
                type="button"
                onClick={onPrevious}
                className="
                flex
                h-9 w-9
                items-center 
                justify-center
                rounded-full bg-slate-100
                hover:bg-slate-200
                cursor-pointer"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="size-5 text-indigo-800 cursor-pointer"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M15.75 19.5 8.25 12l7.5-7.5" 
                    />
                </svg>
            </button>
            
            <button
                type="button"
                onClick={onToggleView}
                className="
                    rounded-full
                    bg-slate-100
                    px-5
                    py-1
                    font-semibold
                    cursor-pointer
                    text-indigo-800
                    hover:bg-slate-200"
            >
                {view === "month"
                    ? year
                    : `${decadeStart}-${decadeStart + 9}`}
            </button>
            
            <button
                type="button"
                onClick={onNext}
                className="
                flex
                h-9 w-9
                items-center 
                justify-center
                rounded-full bg-slate-100
                hover:bg-slate-200
                cursor-pointer"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="size-5 text-indigo-800 cursor-pointer"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m8.25 4.5 7.5 7.5-7.5 7.5" 
                    />
                </svg>
            </button>
        </div>
    )
}