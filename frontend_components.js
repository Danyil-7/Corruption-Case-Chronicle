3. Frontend components (react.js)
3.1 Authentication flow
	3.1.1 Login Component 

function Login() {
    state = { email: '', password: '', error: '' }

    function handleInputChange(field, value) {
        state[field] = value
    }

    async function handleSubmit() {
        response = await api.post('/api/auth/login', {
            email: state.email,
            password: state.password
        })

        if (response.success) {
            // Store JWT token
            localStorage.setItem('token', response.token)
            // Redirect to dashboard or home
            navigate('/dashboard')
        } else {
            state.error = response.message
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={state.email} onChange={(e) => handleInputChange('email', e.target.value)} />
            <input type="password" value={state.password} onChange={(e) => handleInputChange('password', e.target.value)} />
            {state.error && <div>{state.error}</div>}
            <button type="submit">Login</button>
        </form>
    )
}

3.2 Submit a case 

function SubmitCase() {
    state = { title: '', description: '', country: '', year: '', sector: '', error: '', success: '' }

    function handleInputChange(field, value) {
        state[field] = value
    }

    async function handleSubmit() {
        token = localStorage.getItem('token')
        response = await api.post('/api/corruption-cases', {
            title: state.title,
            description: state.description,
            country: state.country,
            year: state.year,
            sector: state.sector
        }, {
            headers: { 'Authorization': token }
        })

        if (response.success) {
            state.success = "Case submitted successfully and is pending approval."
        } else {
            state.error = response.message
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={state.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="Title" />
            <textarea value={state.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Description"></textarea>
            <input type="text" value={state.country} onChange={(e) => handleInputChange('country', e.target.value)} placeholder="Country" />
            <input type="number" value={state.year} onChange={(e) => handleInputChange('year', e.target.value)} placeholder="Year" />
            <input type="text" value={state.sector} onChange={(e) => handleInputChange('sector', e.target.value)} placeholder="Sector" />
            {state.error && <div>{state.error}</div>}
            {state.success && <div>{state.success}</div>}
            <button type="submit">Submit Case</button>
        </form>
    )
}

3.3 Case list and search feature 

function SubmitCase() {
    state = { title: '', description: '', country: '', year: '', sector: '', error: '', success: '' }

    function handleInputChange(field, value) {
        state[field] = value
    }

    async function handleSubmit() {
        token = localStorage.getItem('token')
        response = await api.post('/api/corruption-cases', {
            title: state.title,
            description: state.description,
            country: state.country,
            year: state.year,
            sector: state.sector
        }, {
            headers: { 'Authorization': token }
        })

        if (response.success) {
            state.success = "Case submitted successfully and is pending approval."
        } else {
            state.error = response.message
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={state.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="Title" />
            <textarea value={state.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Description"></textarea>
            <input type="text" value={state.country} onChange={(e) => handleInputChange('country', e.target.value)} placeholder="Country" />
            <input type="number" value={state.year} onChange={(e) => handleInputChange('year', e.target.value)} placeholder="Year" />
            <input type="text" value={state.sector} onChange={(e) => handleInputChange('sector', e.target.value)} placeholder="Sector" />
            {state.error && <div>{state.error}</div>}
            {state.success && <div>{state.success}</div>}
            <button type="submit">Submit Case</button>
        </form>
    )
}

3.4 Case Details page 

function CaseDetails({ caseId }) {
    state = { corruptionCase: null, error: '' }

    useEffect(() => {
        fetchCaseDetails()
    }, [caseId])

    async function fetchCaseDetails() {
        response = await api.get(`/api/corruption-cases/${caseId}`)

        if (response.success) {
            state.corruptionCase = response.data
        } else {
            state.error = response.message
        }
    }

    if (state.error) {
        return <div>{state.error}</div>
    }

    if (!state.corruptionCase) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{state.corruptionCase.title}</h1>
            <p>{state.corruptionCase.description}</p>
            <p>Country: {state.corruptionCase.country}</p>
            <p>Year: {state.corruptionCase.year}</p>
            <p>Sector: {state.corruptionCase.sector}</p>
        </div>
    )
}
