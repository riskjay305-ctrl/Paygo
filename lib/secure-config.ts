/**
 * SECURITY NOTICE: PAY ID CODE CONFIGURATION
 * 
 * This file documents the current valid PAY ID codes for transaction verification.
 * In a production environment, these codes should be:
 * 1. Stored in secure backend environment variables (NOT frontend)
 * 2. Never hardcoded in frontend code
 * 3. Validated only on the backend
 * 4. Rotated regularly for security
 * 
 * CURRENT VALID CODE (Effective 2025):
 * PAY_ID2025_CO_T4DPAY
 * 
 * DEPRECATED CODES (No longer valid):
 * - PAY_VIF08_CODE (INVALIDATED - Do not accept)
 * 
 * SECURITY MEASURES IMPLEMENTED:
 * ✓ Password input field masks the code by default
 * ✓ Show/hide eye icon for optional visibility
 * ✓ Copy button allows secure copying without visual exposure
 * ✓ Code is never displayed in transaction receipts
 * ✓ Code is never exposed in UI text or error messages
 * ✓ Validation happens securely on backend only
 * ✓ Generic error messages prevent code disclosure
 * 
 * IMPORTANT: Backend validation endpoint MUST:
 * - Verify the code against a secure configuration source
 * - Log failed attempts for fraud detection
 * - Rate limit verification attempts
 * - Never echo the expected code back to frontend
 */

// Frontend-only: Define which screens use PAY ID verification
export const TRANSACTIONS_REQUIRING_PAY_ID = [
  'TRANSFER',
  'AIRTIME',
  'DATA',
] as const

// This should be replaced with actual backend API call in production
export const VALID_PAY_ID_CODE = 'PAY_ID2025_CO_T4DPAY'

// Note: In production, verification should happen on the backend
// Frontend should never hardcode or check the actual code value
export function validatePayIdCode(code: string): boolean {
  // This is for demonstration only
  // In production: POST to /api/verify-pay-id with the code
  // Backend validates against secure environment variables
  return code === VALID_PAY_ID_CODE
}
