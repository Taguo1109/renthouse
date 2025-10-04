export const FRONTEND_BASE = 'https://taguo1109.github.io/renthouse';
export const OAUTH_BASE = 'https://oauth.zeabur.app';

export const GOOGLE_LOGIN_URL =
  `${OAUTH_BASE}/auth/entry?target=${encodeURIComponent(FRONTEND_BASE + '/profile')}`;