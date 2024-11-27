8. Sample Pseudocode for Search Functionality
8.1. Backend Search Endpoint
GET /api/corruption-cases?country=X&year=Y&sector=Z
function getCorruptionCases(req, res) {
    // Extract query parameters
    filters = {}
    if (req.query.country) filters.country = req.query.country
    if (req.query.year) filters.year = req.query.year
    if (req.query.sector) filters.sector = req.query.sector
    filters.status = 'approved' // Only approved cases are visible to the public
    // Retrieve cases from the database
    cases = database.findCorruptionCases(filters)
    return res.status(200).send(cases)
}
8.2. Frontend Handling of Search Filters
function buildQueryString(filters) {
    parts = []
    if (filters.country) parts.push(`country=${encodeURIComponent(filters.country)}`)
    if (filters.year) parts.push(`year=${encodeURIComponent(filters.year)}`)
    if (filters.sector) parts.push(`sector=${encodeURIComponent(filters.sector)}`)
    return parts.length > 0 ? '?' + parts.join('&') : ''
}
