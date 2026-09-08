import "server-only";
import { getSessionFromCookies, SessionPayload } from "./auth";
/**
 * Mengembalikan data session admin jika sudah login,
 * atau null jika belum login.
 * Dipakai di dalam Route Handler API (app/api/**\/route.ts).
 */
export async function requireAdmin(): Promise<SessionPayload | null> {
  const session = await getSessionFromCookies();
  return session;
}
