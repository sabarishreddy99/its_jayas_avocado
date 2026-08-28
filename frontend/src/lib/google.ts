/** Google OAuth 2.0 *Web application* client ID, inlined at build time.
 *
 *  One client serves every Google surface on the site — the gradeVITian login and
 *  the admin desk — so its "Authorized JavaScript origins" must list every origin
 *  those pages are served from. Empty when Google Sign-In isn't configured for a
 *  build, and each surface hides its button rather than rendering one that can't work.
 */
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
