import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../config/db";
import { prestasi } from "../../../../config/schema";
import { getSessionFromCookies } from "../../../../lib/auth";
import {uploadImage,deleteImage,isValidImageFile,} from "../../../../lib/cloudinary";
import { badRequest, handleRoute, ok, unauthorized } from "../../../../lib/api.response";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// =====================================================
// GET /api/prestasi/[id]
// =====================================================

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  return handleRoute(async () => {
    const { id } = await params;

    const prestasiId = Number(id);

    if (Number.isNaN(prestasiId)) {
      return badRequest("ID prestasi tidak valid");
    }

    const data = await db
      .select()
      .from(prestasi)
      .where(eq(prestasi.id, prestasiId))
      .limit(1);

    if (data.length === 0) {
      return badRequest(
        "Data prestasi tidak ditemukan"
      );
    }

    return ok(data[0]);
  });
}

// =====================================================
// PUT /api/prestasi/[id]
// =====================================================

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();

    if (!session) {
      return unauthorized(
        "Anda harus login sebagai admin"
      );
    }

    const { id } = await params;

    const prestasiId = Number(id);

    if (Number.isNaN(prestasiId)) {
      return badRequest("ID prestasi tidak valid");
    }

    // =================================================
    // CARI DATA LAMA
    // =================================================

    const existingData = await db
      .select()
      .from(prestasi)
      .where(eq(prestasi.id, prestasiId))
      .limit(1);

    if (existingData.length === 0) {
      return badRequest(
        "Data prestasi tidak ditemukan"
      );
    }

    const existing = existingData[0];

    // =================================================
    // AMBIL FORM DATA
    // =================================================

    const formData = await req.formData();

    const judulValue = formData.get("judul");
    const deskripsiValue = formData.get("deskripsi");
    const tahunValue = formData.get("tahun");
    const gambarValue = formData.get("gambar");

    // =================================================
    // VALIDASI JUDUL
    // =================================================

    if (typeof judulValue !== "string") {
      return badRequest("Judul wajib diisi");
    }

    const judul = judulValue.trim();

    if (!judul) {
      return badRequest("Judul wajib diisi");
    }

    // =================================================
    // VALIDASI DESKRIPSI
    // =================================================

    if (typeof deskripsiValue !== "string") {
      return badRequest("Deskripsi wajib diisi");
    }

    const deskripsi = deskripsiValue.trim();

    if (!deskripsi) {
      return badRequest(
        "Deskripsi wajib diisi"
      );
    }

    // =================================================
    // VALIDASI TAHUN
    // =================================================

    if (typeof tahunValue !== "string") {
      return badRequest("Tahun wajib diisi");
    }

    const tahun = tahunValue.trim();

    if (!tahun) {
      return badRequest("Tahun wajib diisi");
    }

    // =================================================
    // GAMBAR
    // =================================================

    let gambarUrl = existing.gambarUrl;
    let gambarPublicId = existing.gambarPublicId;

    // Kalau ada gambar baru
    if (
      gambarValue instanceof File &&
      gambarValue.size > 0
    ) {
      if (!isValidImageFile(gambarValue)) {
        return badRequest(
          "Format gambar harus JPG, PNG, WEBP, atau GIF dan maksimal 5 MB"
        );
      }

      // Upload gambar baru
      const uploaded = await uploadImage(
        gambarValue,
        "prestasi"
      );

      gambarUrl = uploaded.url;
      gambarPublicId = uploaded.publicId;

      // Hapus gambar lama
      await deleteImage(
        existing.gambarPublicId
      );
    }

    // =================================================
    // UPDATE DATABASE
    // =================================================

    await db
      .update(prestasi)
      .set({
        judul,
        deskripsi,
        tahun,
        gambarUrl,
        gambarPublicId,
      })
      .where(eq(prestasi.id, prestasiId));

    // Ambil data terbaru
    const updatedData = await db
      .select()
      .from(prestasi)
      .where(eq(prestasi.id, prestasiId))
      .limit(1);

    return ok({
      message: "Prestasi berhasil diubah",
      data: updatedData[0],
    });
  });
}

// =====================================================
// DELETE /api/prestasi/[id]
// =====================================================

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();

    if (!session) {
      return unauthorized(
        "Anda harus login sebagai admin"
      );
    }

    const { id } = await params;

    const prestasiId = Number(id);

    if (Number.isNaN(prestasiId)) {
      return badRequest("ID prestasi tidak valid");
    }

    // =================================================
    // CARI DATA
    // =================================================

    const existingData = await db
      .select()
      .from(prestasi)
      .where(eq(prestasi.id, prestasiId))
      .limit(1);

    if (existingData.length === 0) {
      return badRequest(
        "Data prestasi tidak ditemukan"
      );
    }

    const existing = existingData[0];

    // =================================================
    // HAPUS GAMBAR CLOUDINARY
    // =================================================

    await deleteImage(
      existing.gambarPublicId
    );

    // =================================================
    // HAPUS DATABASE
    // =================================================

    await db
      .delete(prestasi)
      .where(eq(prestasi.id, prestasiId));

    return ok({
      message: "Prestasi berhasil dihapus",
    });
  });
}