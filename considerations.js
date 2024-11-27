12. Considerations:
12.1 Environment Variables (Backend)
// .env file
DATABASE_URL=postgresql://username:password@localhost:5432/corruption_db
SECRET_KEY=your_jwt_secret_key
PORT=5000

12.2 Configurations of CORS (BE)

const corsOptions = {
    origin: 'https://your-frontend-domain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

12.3 Error Handling and FE API calls

const api = {
    async post(endpoint, data, config={}) {
        try {
            response = await fetch(BASE_URL + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...config.headers },
                body: JSON.stringify(data)
            })
            return await response.json()
        } catch (error) {
            return { success: false, message: error.message }
        }
    },
    async get(endpoint, config={}) {
        try {
            response = await fetch(BASE_URL + endpoint, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', ...config.headers }
            })
            return await response.json()
        } catch (error) {
            return { success: false, message: error.message }
        }
    },
    // Similarly, handle other methods
}


12. 4 Secureing API Endpoints 

// Middleware usage
app.post('/api/corruption-cases', authenticateJWT, authorizeRoles(['admin', 'data_analyst', 'user']), submitCorruptionCase)
app.put('/api/corruption-cases/:id/verify', authenticateJWT, authorizeRoles(['admin', 'data_analyst']), verifyCorruptionCase)
