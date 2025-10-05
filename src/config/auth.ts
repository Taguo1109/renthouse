// config/auth.ts
export const FRONTEND_BASE = 'https://oauthrent.taguo1109.com/';
export const OAUTH_BASE = 'https://oauth.taguo1109.com';
export const GOOGLE_LOGIN_URL =
  `${OAUTH_BASE}/api/auth/entry?target=${encodeURIComponent(FRONTEND_BASE)}`;
