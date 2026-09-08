import { NextRequest } from "next/server";
import { db } from "../../../config/db";
import { guru } from "../../../config/schema";
import { getSessionFromCookies } from "../../../lib/auth";
import { uploadImage, isValidImageFile,} from "../../../lib/cloudinary";
import { badRequest, handleRoute, ok, unauthorized } from "../../../lib/api.response";

// =====================================================
// GET /api/guru
// Ambil semua data guru
// =====================================================

export async function GET() {
  return handleRoute(async () => {
    const data = await db
      .select()
      .from(guru);

    return ok(data);
  });
}

// =====================================================
// POST /api/guru
// Tambah guru
// =====================================================

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    // Cek login admin
    const session = await getSessionFromCookies();

    if (!session) {
      return unauthorized(
        "Anda harus login sebagai admin"
      );
    }

    // Ambil FormData
    const formData = await req.formData();

    const namaValue = formData.get("nama");
    const nipValue = formData.get("nip");
    const mataPelajaranValue =
      formData.get("mataPelajaran");
    const jabatanValue = formData.get("jabatan");
    const fotoValue = formData.get("foto");

    // Validasi nama
    if (typeof namaValue !== "string") {
      return badRequest("Nama wajib diisi");
    }

    const nama = namaValue.trim();

    if (!nama) {
      return badRequest("Nama wajib diisi");
    }

    // Ambil data optional
    const nip =
      typeof nipValue === "string"
        ? nipValue.trim()
        : null;

    const mataPelajaran =
      typeof mataPelajaranValue === "string"
        ? mataPelajaranValue.trim()
        : null;

    const jabatan =
      typeof jabatanValue === "string"
        ? jabatanValue.trim()
        : null;

    // =================================================
    // UPLOAD FOTO
    // =================================================

    let fotoUrl: string | null = null;
    let fotoPublicId: string | null = null;

    if (
      fotoValue instanceof File &&
      fotoValue.size > 0
    ) {
      if (!isValidImageFile(fotoValue)) {
        return badRequest(
          "Format foto harus JPG, PNG, WEBP, atau GIF dan maksimal 5 MB"
        );
      }

      const uploaded = await uploadImage(
        fotoValue,
        "guru"
      );

      fotoUrl = uploaded.url;
      fotoPublicId = uploaded.publicId;
    }

    // =================================================
    // INSERT DATABASE
    // =================================================

    await db.insert(guru).values({
      nama,
      nip,
      mataPelajaran,
      jabatan,
      fotoUrl,
      fotoPublicId,
    });

    return ok({
      message: "Data guru berhasil ditambahkan",
    });
  });
}