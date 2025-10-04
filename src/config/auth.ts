export const FRONTEND_BASE = 'http://localhost:5173/renthouse';
export const OAUTH_BASE = 'http://localhost:8080';

export const GOOGLE_LOGIN_URL =
  `${OAUTH_BASE}/auth/entry?target=${encodeURIComponent(FRONTEND_BASE + '/profile')}`;