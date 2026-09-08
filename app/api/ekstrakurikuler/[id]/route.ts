import { NextRequest } from "next/server";
import { badRequest, handleRoute, ok, unauthorized } from "../../../../lib/api.response";
import { db } from "../../../../config/db";
import { ekstrakurikuler } from "../../../../config/schema";
import { getSessionFromCookies } from "../../../../lib/auth";
import { isValidImageFile, uploadImage } from "../../../../lib/cloudinary";


// GET semua ekstrakurikuler
export async function GET() {
  return handleRoute(async () => {
    const data = await db
      .select()
      .from(ekstrakurikuler);

    return ok(data);
  });
}

// POST tambah ekstrakurikuler
export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();

    if (!session) {
      return unauthorized("Anda harus login sebagai admin");
    }

    const formData = await req.formData();

    const namaValue = formData.get("nama");
    const deskripsiValue = formData.get("deskripsi");
    const gambarValue = formData.get("gambar");

    if (
      typeof namaValue !== "string" ||
      typeof deskripsiValue !== "string"
    ) {
      return badRequest("Nama dan deskripsi wajib diisi");
    }

    const nama = namaValue.trim();
    const deskripsi = deskripsiValue.trim();

    if (!nama || !deskripsi) {
      return badRequest("Nama dan deskripsi wajib diisi");
    }

    let gambarUrl: string | null = null;
    let gambarPublicId: string | null = null;

    // Upload gambar jika ada
    if (gambarValue instanceof File && gambarValue.size > 0) {
      if (!isValidImageFile(gambarValue)) {
        return badRequest(
          "Format gambar harus JPG, PNG, WEBP, atau GIF dan maksimal 5 MB"
        );
      }

      const uploaded = await uploadImage(
        gambarValue,
        "ekstrakurikuler"
      );

      gambarUrl = uploaded.url;
      gambarPublicId = uploaded.publicId;
    }

    await db.insert(ekstrakurikuler).values({
      nama,
      deskripsi,
      gambarUrl,
      gambarPublicId,
    });

    return ok({
      message: "Ekstrakurikuler berhasil ditambahkan",
    });
  });
}