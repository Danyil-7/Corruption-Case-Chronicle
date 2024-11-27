7. Frontend Interactive Components
7.1. Filter Component
function FilterComponent({ filters, onChange }) {
    function handleFilterUpdate(field, value) {
        onChange(field, value)
    }
    return (
        <div>
            <select onChange={(e) => handleFilterUpdate('country', e.target.value)}>
                <option value="">All Countries</option>
                <!-- Populate with country options -->
            </select>
            <input type="number" placeholder="Year" onChange={(e) => handleFilterUpdate('year', e.target.value)} />
            <select onChange={(e) => handleFilterUpdate('sector', e.target.value)}>
                <option value="">All Sectors</option>
                <!-- Populate with sector options -->
            </select>
            <button onClick={fetchCases}>Apply Filters</button>
        </div>
    )
}
7.2. Admin Dashboard for Data Analysts
function AdminDashboard() {
    state = { pendingCases: [], error: '' }
    useEffect(() => {
        fetchPendingCases()
    }, [])
    async function fetchPendingCases() {
        response = await api.get('/api/corruption-cases?status=pending', {
            headers: { 'Authorization': getToken() }
        })
        if (response.success) {
            state.pendingCases = response.data
        } else {
            state.error = response.message
        }
    }
    async function handleVerification(caseId, status, comments) {
        response = await api.put(`/api/corruption-cases/${caseId}/verify`, {
            verification_status: status,
            comments: comments
        }, {
            headers: { 'Authorization': getToken() }
        })
        if (response.success) {
            // Update the UI accordingly
            fetchPendingCases()
        } else {
            state.error = response.message
        }
    }
    return (
        <div>
            <h2>Pending Corruption Cases</h2>
            {state.error && <div>{state.error}</div>}
            <ul>
                {state.pendingCases.map(case => (
                    <li key={case.id}>
                        <h3>{case.title}</h3>
                        <p>{case.description}</p>
                        <button onClick={() => handleVerification(case.id, 'approved', 'Looks good')}>Approve</button>
                        <button onClick={() => handleVerification(case.id, 'rejected', 'Insufficient details')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
