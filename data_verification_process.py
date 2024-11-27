6. Data Verification Process
6.1. Automated Checks (Backend)
function automatedDataValidation(corruptionCase) {
    // Example validations
    if (isEmpty(corruptionCase.title) || isEmpty(corruptionCase.description)) {
        return false
    }
    if (!isValidYear(corruptionCase.year)) {
        return false
    }
    // Additional rules can be added here
    return true
}
function submitCorruptionCase(req, res) {
    // Extract and validate data as previously outlined
    // Automated validation
    isValid = automatedDataValidation(newCase)
    if (!isValid) {
        corruptionCase.status = 'rejected'
    }
    // Save to database
    newCase = database.createCorruptionCase({
        // ... data fields
        status: isValid ? 'pending' : 'rejected'
    })
    // Optionally notify submitter or analyst
    return res.status(201).send(newCase)
}
6.2. Manual Review Interface (Admin Dashboard)
6.2.1. Approve or Reject Case
function approveOrRejectCase(caseId, verificationStatus, comments, verifiedBy) {
    // Retrieve the case
    corruptionCase = database.findCorruptionCaseById(caseId)
    if (!corruptionCase) {
        return error("Case not found")
    }
    // Update status
    corruptionCase.status = verificationStatus
    corruptionCase.updated_at = currentTimestamp()
    database.updateCorruptionCase(corruptionCase)
    // Log the verification
    verificationLog = database.createCaseVerification({
        case_id: caseId,
        verified_by: verifiedBy,
        verification_status: verificationStatus,
        comments: comments
    })
    return success(corruptionCase)
}
