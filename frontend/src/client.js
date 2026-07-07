BASE_URL = import.meta.env.VITE_API_URL

export const fetchEstimate = async (payload) => {
    const response = await fetch(`${BASE_URL}/cpf-tax-estimator/estimate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return data;
};