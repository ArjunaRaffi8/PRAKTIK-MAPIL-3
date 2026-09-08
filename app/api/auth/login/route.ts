import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { admins } from "../../../../config/schema";
import { db } from "../../../../config/db";
import { loginSchema } from "../../../../lib/validation";
import { createSessionToken, setSessionCookie, verifyPassword } from "../../../../lib/auth";
import { ok, handleRoute, unauthorized } from "../../../../lib/api.response";

// POST /api/auth/login
// body: { email, password }
export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    if (!admin) {
      return unauthorized("Email atau password salah");
    }

    const isValid = await verifyPassword(password, admin.password);
    if (!isValid) {
      return unauthorized("Email atau password salah");
    }

    const token = await createSessionToken({
      adminId: admin.id,
      email: admin.email,
      nama: admin.nama,
    });

    await setSessionCookie(token);

    return ok({
      id: admin.id,
      nama: admin.nama,
      email: admin.email,
    });
  });
}
