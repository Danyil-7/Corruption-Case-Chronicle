4. Sample Pseudocode for Key Backend Components
4.1. Server Initialization
function initializeServer() {
    app = express()
    // Middleware
    app.use(express.json())
    app.use(cors())
    // Routes
    app.post('/api/auth/register', registerUser)
    app.post('/api/auth/login', loginUser)
    // Protected Routes
    app.post('/api/corruption-cases', authenticateJWT, authorizeRoles(['admin', 'data_analyst', 'user']), submitCorruptionCase)
    app.put('/api/corruption-cases/:id/verify', authenticateJWT, authorizeRoles(['admin', 'data_analyst']), verifyCorruptionCase)
    app.get('/api/corruption-cases', getCorruptionCases)
    app.get('/api/corruption-cases/:id', getCorruptionCaseDetails)
    // Start Server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}
4.2. Utility Functions
4.2.1. JWT Generation and Verification
function generateJWT(userId, role) {
    payload = { id: userId, role: role, iat: currentTimestamp() }
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    return token
}
function verifyJWT(token) {
    payload = jwt.verify(token, SECRET_KEY)
    return payload
}
4.2.2. Password Hashing and Verification
function hashPassword(password) {
    salt = bcrypt.genSaltSync(10)
    hash = bcrypt.hashSync(password, salt)
    return hash
}
function verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}
