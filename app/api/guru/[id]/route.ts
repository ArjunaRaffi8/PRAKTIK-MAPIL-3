import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../config/db";
import { guru } from "../../../../config/schema";
import { getSessionFromCookies } from "../../../../lib/auth";
import { uploadImage,deleteImage,isValidImageFile,} from "../../../../lib/cloudinary";
import { badRequest, handleRoute, ok, unauthorized } from "../../../../lib/api.response";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// =====================================================
// GET /api/guru/[id]
// Ambil guru berdasarkan ID
// =====================================================

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  return handleRoute(async () => {
    const { id } = await params;

    const guruId = Number(id);

    if (Number.isNaN(guruId)) {
      return badRequest("ID guru tidak valid");
    }

    const data = await db
      .select()
      .from(guru)
      .where(eq(guru.id, guruId))
      .limit(1);

    if (data.length === 0) {
      return badRequest(
        "Data guru tidak ditemukan"
      );
    }

    return ok(data[0]);
  });
}

// =====================================================
// PUT /api/guru/[id]
// Edit guru
// =====================================================

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  return handleRoute(async () => {
    // Cek login admin
    const session = await getSessionFromCookies();

    if (!session) {
      return unauthorized(
        "Anda harus login sebagai admin"
      );
    }

    const { id } = await params;

    const guruId = Number(id);

    if (Number.isNaN(guruId)) {
      return badRequest("ID guru tidak valid");
    }

    // =================================================
    // CARI DATA LAMA
    // =================================================

    const existingData = await db
      .select()
      .from(guru)
      .where(eq(guru.id, guruId))
      .limit(1);

    if (existingData.length === 0) {
      return badRequest(
        "Data guru tidak ditemukan"
      );
    }

    const existing = existingData[0];

    // =================================================
    // AMBIL FORM DATA
    // =================================================

    const formData = await req.formData();

    const namaValue = formData.get("nama");
    const nipValue = formData.get("nip");
    const mataPelajaranValue =
      formData.get("mataPelajaran");
    const jabatanValue = formData.get("jabatan");
    const fotoValue = formData.get("foto");

    // =================================================
    // VALIDASI NAMA
    // =================================================

    if (typeof namaValue !== "string") {
      return badRequest("Nama wajib diisi");
    }

    const nama = namaValue.trim();

    if (!nama) {
      return badRequest("Nama wajib diisi");
    }

    // =================================================
    // DATA LAIN
    // =================================================

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
    // FOTO
    // =================================================

    let fotoUrl = existing.fotoUrl;
    let fotoPublicId = existing.fotoPublicId;

    // Kalau ada foto baru
    if (
      fotoValue instanceof File &&
      fotoValue.size > 0
    ) {
      if (!isValidImageFile(fotoValue)) {
        return badRequest(
          "Format foto harus JPG, PNG, WEBP, atau GIF dan maksimal 5 MB"
        );
      }

      // Upload foto baru
      const uploaded = await uploadImage(
        fotoValue,
        "guru"
      );

      fotoUrl = uploaded.url;
      fotoPublicId = uploaded.publicId;

      // Hapus foto lama
      await deleteImage(
        existing.fotoPublicId
      );
    }

    // =================================================
    // UPDATE DATABASE
    // =================================================

    await db
      .update(guru)
      .set({
        nama,
        nip,
        mataPelajaran,
        jabatan,
        fotoUrl,
        fotoPublicId,
      })
      .where(eq(guru.id, guruId));

    // Ambil data terbaru
    const updatedData = await db
      .select()
      .from(guru)
      .where(eq(guru.id, guruId))
      .limit(1);

    return ok({
      message: "Data guru berhasil diubah",
      data: updatedData[0],
    });
  });
}

// =====================================================
// DELETE /api/guru/[id]
// Hapus guru
// =====================================================

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  return handleRoute(async () => {
    // Cek login admin
    const session = await getSessionFromCookies();

    if (!session) {
      return unauthorized(
        "Anda harus login sebagai admin"
      );
    }

    const { id } = await params;

    const guruId = Number(id);

    if (Number.isNaN(guruId)) {
      return badRequest("ID guru tidak valid");
    }

    // =================================================
    // CARI DATA
    // =================================================

    const existingData = await db
      .select()
      .from(guru)
      .where(eq(guru.id, guruId))
      .limit(1);

    if (existingData.length === 0) {
      return badRequest(
        "Data guru tidak ditemukan"
      );
    }

    const existing = existingData[0];

    // =================================================
    // HAPUS FOTO CLOUDINARY
    // =================================================

    await deleteImage(
      existing.fotoPublicId
    );

    // =================================================
    // HAPUS DATABASE
    // =================================================

    await db
      .delete(guru)
      .where(eq(guru.id, guruId));

    return ok({
      message: "Data guru berhasil dihapus",
    });
  });
}