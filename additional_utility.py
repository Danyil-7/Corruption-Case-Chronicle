9. Additional Utility Pseudocode
9.1. Error Handling Middleware (Backend)
function errorHandler(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({ error: 'Something went wrong!' })
}
// Usage
app.use(errorHandler)
9.2. API Rate Limiting (Backend)
function rateLimiter(req, res, next) {
    userIP = req.ip
    currentTime = currentTimestamp()
    if (!rateLimitStore[userIP]) {
        rateLimitStore[userIP] = { count: 1, lastRequest: currentTime }
        next()
    } else {
        elapsed = currentTime - rateLimitStore[userIP].lastRequest
        if (elapsed < TIME_WINDOW) {
            rateLimitStore[userIP].count += 1
            if (rateLimitStore[userIP].count > MAX_REQUESTS) {
                return res.status(429).send("Too many requests")
            }
        } else {
            rateLimitStore[userIP] = { count: 1, lastRequest: currentTime }
        }
        next()
    }
}
// Usage
app.use(rateLimiter)
