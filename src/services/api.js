const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function fetchApi(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
}

async function postAgentPrompt(prompt) {
    const response = await fetch(`${BASE_URL}/agent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
    });

    let result = null;
    try {
        result = await response.json();
    } catch {
        result = null;
    }

    if (!response.ok) {
        const serverMessage = result?.message || `HTTP Error: ${response.status}`;
        throw new Error(serverMessage);
    }

    return result;
}

export {
    fetchApi,
    postAgentPrompt
};
