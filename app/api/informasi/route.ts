import { NextRequest } from "next/server";
import { eq, desc } from "drizzle-orm";
import { informasi, informasiSchema } from "../../../config/schema";
import { db } from "../../../config/db";
import { getSessionFromCookies } from "../../../lib/auth";
import { uploadImage, isValidImageFile } from "../../../lib/cloudinary";
import { generateSlug } from "../../../lib/utils";
import { ok, handleRoute,badRequest , unauthorized } from "../../../lib/api/response";

// GET /api/informasi
// Ambil semua data informasi, urut dari yang terbaru. Bisa diakses publik.
export async function GET() {
  return handleRoute(async () => {
    const data = await db
      .select()
      .from(informasi)
      .orderBy(desc(informasi.createdAt));

    return ok(data);
  });
}

// POST /api/informasi
// Tambah data informasi baru. Hanya admin yang login.
// body: multipart/form-data -> judul, isi, gambar (File, opsional)
export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();
    if (!session) {
      return unauthorized("Anda harus login sebagai admin");
    }

    const formData = await req.formData();
    const judul = formData.get("judul");
    const isi = formData.get("isi");
    const gambar = formData.get("gambar");

    const parsed = informasiSchema.parse({ judul, isi });

    // Generate slug unik dari judul
    const baseSlug = generateSlug(parsed.judul);
    let slug = baseSlug;
    let counter = 1;
    while (
      (
        await db
          .select()
          .from(informasi)
          .where(eq(informasi.slug, slug))
          .limit(1)
      ).length > 0
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    let gambarUrl: string | null = null;
    let gambarPublicId: string | null = null;

    if (gambar instanceof File && gambar.size > 0) {
      if (!isValidImageFile(gambar)) {
        return badRequest(
          "Gambar tidak valid. Gunakan format JPEG/PNG/WEBP/GIF maksimal 5MB"
        );
      }
      const uploaded = await uploadImage(gambar, "informasi");
      gambarUrl = uploaded.url;
      gambarPublicId = uploaded.publicId;
    }

    const [inserted] = await db.insert(informasi).values({
      judul: parsed.judul,
      slug,
      isi: parsed.isi,
      gambarUrl,
      gambarPublicId,
    });

    const [newData] = await db
      .select()
      .from(informasi)
      .where(eq(informasi.id, inserted.insertId));

    return ok(newData, 201);
  });
}