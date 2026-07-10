export default function ContributionSection() {
    return (
        <div className="border-slate-200 bg-white">
            <h3 className="
                bg-slate-100
                mb-3 
                px-2
                py-3
                rounded-lg
                font-bold"
            >Share of CPF Contributions
            </h3>

            <div className="
                border border-slate-200
                rounded-lg
                space-y-5 
                p-6"
            >
                <div className="
                    flex flex-col 
                    items-start 
                    justify-between 
                    gap-4
                    border-b border-slate-200 
                    pb-5"
                >
                    <div>
                        <p className="font-medium">
                            Employee's Share
                        </p>

                        <p className="mt-1  text-slate-600">
                            (20% x $8,000.00) + (20% x $213,123.00)
                        </p>
                    </div>

                    <span className="
                        w-full 
                        text-end
                        text-2xl 
                        text-slate-700"
                    >$1,600.00
                    </span>
                </div>

                <div className="
                    flex 
                    flex-col 
                    items-start 
                    justify-between
                    gap-4 
                    border-b border-slate-200 
                    pb-5"
                >
                    <div>
                        <p className="font-medium">
                            Employer's Share
                        </p>

                        <p className="mt-1 text-slate-600">
                            ($81,816.00 - $44,224.00)
                        </p>
                    </div>

                    <span className="
                        w-full 
                        text-end
                        text-2xl 
                        text-slate-700"
                    >$1,360.00
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-slate-600">
                        Total CPF Contributions
                    </p>
                    <p className="
                        text-end 
                        text-2xl 
                        font-semibold
                        text-slate-700"
                    >$2,960.00
                    </p>
                </div>
            </div>
        </div>
    );
}