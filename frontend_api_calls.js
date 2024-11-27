5. Sample Pseudocode for Frontend API Calls
5.1. API Utility
const api = {
    async post(endpoint, data, config={}) {
        response = await fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...config.headers },
            body: JSON.stringify(data)
        })
        return await response.json()
    },
    async get(endpoint, config={}) {
        response = await fetch(BASE_URL + endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', ...config.headers }
        })
        return await response.json()
    },
    // Similarly, implement PUT, DELETE if needed
}
5.2. Authentication Handling
function setAuthToken(token) {
    if (token) {
        api.defaults.headers.common['Authorization'] = token
    } else {
        delete api.defaults.headers.common['Authorization']
    }
}
function logout() {
    localStorage.removeItem('token')
    setAuthToken(null)
    navigate('/login')
}
