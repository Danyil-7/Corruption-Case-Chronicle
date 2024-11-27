10. Testing Pseudocode
10.1. Unit Test for Authentication (Backend)
function testLoginUser_Success() {
    // Setup: Create a test user
    testUser = database.createUser({
        username: "testuser",
        email: "test@example.com",
        password_hash: hashPassword("SecurePass123"),
        role: 'user'
    })
    // Action: Attempt to login
    response = loginUser("test@example.com", "SecurePass123")
    // Assertion: Check if login is successful and token is returned
    assert(response.success == true)
    assert(response.token exists)
}
function testLoginUser_IncorrectPassword() {
    // Setup: Create a test user
    testUser = database.createUser({
        username: "testuser2",
        email: "test2@example.com",
        password_hash: hashPassword("SecurePass123"),
        role: 'user'
    })
    // Action: Attempt to login with wrong password
    response = loginUser("test2@example.com", "WrongPass")
    // Assertion: Check if login fails
    assert(response.success == false)
    assert(response.message == "Incorrect password")
}
10.2. Integration Test for Case Submission and Approval
function testCaseSubmissionAndApproval() {
    // Setup: Create and login an admin user
    adminUser = database.createUser({
        username: "admin",
        email: "admin@example.com",
        password_hash: hashPassword("AdminPass123"),
        role: 'admin'
    })
    adminToken = generateJWT(adminUser.id, adminUser.role)
    // Action: Submit a new corruption case
    submissionResponse = submitCorruptionCase({
        title: "Bribery in Construction",
        description: "Details about the bribery case...",
        country: "CountryX",
        year: 2023,
        sector: "Construction"
    }, { headers: { 'Authorization': adminToken } })
    // Assertion: Check if case is created with 'pending' status
    assert(submissionResponse.status == 'pending')
    // Action: Approve the case
    approvalResponse = verifyCorruptionCase(submissionResponse.id, 'approved', "Verified and approved", adminUser.id)
    // Assertion: Check if case status is updated to 'approved'
    assert(approvalResponse.status == 'approved')
    // Action: Retrieve the case details
    caseDetails = getCorruptionCaseDetails(submissionResponse.id)
    // Assertion: Check if case is retrievable and approved
    assert(caseDetails.status == 'approved')
}

