export const SITE_NAME = "Free AI Tools to Boost your Productivity Instantly - Startup Studio Dev"
export const SITE_DESCRIPTION = "Access 100+ free AI-powered tools to automate workflows, optimize processes, and transform operations. Expert-backed no-cost AI solutions for businesses. Start saving time today!"
export const SITE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://freetools.startupstudio.dev"
export const GITHUB_REPO_URL = "https://github.com/LubomirGeorgiev/freetools.startupstudio.dev"

export const SITE_DOMAIN = new URL(SITE_URL).hostname
export const PASSWORD_RESET_TOKEN_EXPIRATION_SECONDS = 24 * 60 * 60 // 24 hours
export const EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECONDS = 24 * 60 * 60 // 24 hours
export const SESSION_COOKIE_NAME = "session";
export const GOOGLE_OAUTH_STATE_COOKIE_NAME = "google-oauth-state";
export const GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME = "google-oauth-code-verifier";
