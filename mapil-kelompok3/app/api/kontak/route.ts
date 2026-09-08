import { NextRequest } from "next/server";
import { db } from "../../../config/db";
import { created, handleRoute } from "../../../lib/response/api.response";
import { kontakCreateSchema } from "../../../lib/validations/kontak.validation";
import { kontak } from "../../../config/schema";

// POST /api/kontak
// Publik: digunakan oleh form kontak pengunjung
export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    const body = await req.json();

    const parsed = kontakCreateSchema.parse(body);

    const [result] = await db.insert(kontak).values(parsed);

    return created({
      id: result.insertId,
      message: "Pesan berhasil dikirim. Terima kasih telah menghubungi kami.",
    });
  });
}