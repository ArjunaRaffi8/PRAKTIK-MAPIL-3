import { ok, handleRoute } from "../../../../lib/api.response";
import { clearSessionCookie } from "../../../../lib/auth";

// POST /api/auth/logout
export async function POST() {
  return handleRoute(async () => {
    await clearSessionCookie();
    return ok({ message: "Berhasil logout" });
  });
}
