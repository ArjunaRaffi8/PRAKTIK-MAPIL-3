import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../config/db";
import { getSessionFromCookies } from "../../../../lib/auth";
import { uploadImage, deleteImage, isValidImageFile } from "../../../../lib/cloudinary";
import { ok, badRequest, unauthorized, handleRoute } from "../../../../lib/api.response";
import { generateSlug } from "../../../../lib/utils";
import { informasi,informasiSchema } from "../../../../config/schema";


type Params = { params: Promise<{ id: string }> };

// GET /api/informasi/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const { id } = await params;

    const [data] = await db
      .select()
      .from(informasi)
      .where(eq(informasi.id, Number(id)))
      .limit(1);

    if (!data) {
      return badRequest("Data informasi tidak ditemukan");
    }

    return ok(data);
  });
}

// PUT /api/informasi/[id]
// Update data informasi. Hanya admin yang login.
// body: multipart/form-data -> judul, isi, gambar (File baru, opsional)
export async function PUT(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();
    if (!session) {
      return unauthorized("Anda harus login sebagai admin");
    }

    const { id } = await params;

    const [existing] = await db
      .select()
      .from(informasi)
      .where(eq(informasi.id, Number(id)))
      .limit(1);

    if (!existing) {
      return badRequest("Data informasi tidak ditemukan");
    }

    const formData = await req.formData();
    const judul = formData.get("judul");
    const isi = formData.get("isi");
    const gambar = formData.get("gambar");

    const parsed = informasiSchema.parse({ judul, isi });

    // Regenerate slug hanya kalau judul berubah
    let slug = existing.slug;
    if (parsed.judul !== existing.judul) {
      const baseSlug = generateSlug(parsed.judul);
      slug = baseSlug;
      let counter = 1;
      while (
        (
          await db
            .select()
            .from(informasi)
            .where(eq(informasi.slug, slug))
            .limit(1)
        ).length > 0 &&
        slug !== existing.slug
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    let gambarUrl = existing.gambarUrl;
    let gambarPublicId = existing.gambarPublicId;

    if (gambar instanceof File && gambar.size > 0) {
      if (!isValidImageFile(gambar)) {
        return badRequest(
          "Gambar tidak valid. Gunakan format JPEG/PNG/WEBP/GIF maksimal 5MB"
        );
      }
      const uploaded = await uploadImage(gambar, "informasi");
      await deleteImage(existing.gambarPublicId);
      gambarUrl = uploaded.url;
      gambarPublicId = uploaded.publicId;
    }

    await db
      .update(informasi)
      .set({
        judul: parsed.judul,
        slug,
        isi: parsed.isi,
        gambarUrl,
        gambarPublicId,
      })
      .where(eq(informasi.id, Number(id)));

    const [updated] = await db
      .select()
      .from(informasi)
      .where(eq(informasi.id, Number(id)))
      .limit(1);

    return ok(updated);
  });
}

// DELETE /api/informasi/[id]
// Hapus data informasi (sekaligus hapus gambar di Cloudinary). Hanya admin yang login.
export async function DELETE(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();
    if (!session) {
      return unauthorized("Anda harus login sebagai admin");
    }

    const { id } = await params;

    const [existing] = await db
      .select()
      .from(informasi)
      .where(eq(informasi.id, Number(id)))
      .limit(1);

    if (!existing) {
      return badRequest("Data informasi tidak ditemukan");
    }

    await deleteImage(existing.gambarPublicId);
    await db.delete(informasi).where(eq(informasi.id, Number(id)));

    return ok({ message: "Data informasi berhasil dihapus" });
  });
}