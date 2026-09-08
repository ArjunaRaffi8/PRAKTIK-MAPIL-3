import { handleRoute, ok, unauthorized } from "../../../lib/api.response";
import { getSessionFromCookies } from "../../../lib/auth";

// GET /api/auth/me
// Mengembalikan data admin yang sedang login (dari cookie session).
export async function GET() {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();
    if (!session) {
      return unauthorized("Belum login");
    }
    return ok(session);
  });
}
