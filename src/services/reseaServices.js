const BASE_URL = 'http://localhost:3000';

async function fetchApi(endpoint) {

    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {

        throw new Error(`HTTP Error: ${response.status}`);
    }
    const result = await response.json();

    return result.data;
}

export { fetchApi };