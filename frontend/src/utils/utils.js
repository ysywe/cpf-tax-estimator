export function formatCurrency(value) {
    return `$${Number(value).toLocaleString("en-SG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

export function formatPercent(value, decimals = 0) {
    return `${(Number(value) * 100).toFixed(decimals)}%`;
}