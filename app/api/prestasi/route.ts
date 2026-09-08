import { NextRequest } from "next/server";

import { db } from "../../../config/db";
import { prestasi } from "../../../config/schema";
import { getSessionFromCookies } from "../../../lib/auth";

import {uploadImage,isValidImageFile,} from "../../../lib/cloudinary";
import { badRequest, handleRoute, ok, unauthorized } from "../../../lib/api.response";

// =====================================================
// GET /api/prestasi
// Ambil semua prestasi
// =====================================================

export async function GET() {
  return handleRoute(async () => {
    const data = await db
      .select()
      .from(prestasi);

    return ok(data);
  });
}

// =====================================================
// POST /api/prestasi
// Tambah prestasi
// =====================================================

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    const session = await getSessionFromCookies();

    if (!session) {
      return unauthorized(
        "Anda harus login sebagai admin"
      );
    }

    const formData = await req.formData();

    const judulValue = formData.get("judul");
    const deskripsiValue = formData.get("deskripsi");
    const tahunValue = formData.get("tahun");
    const gambarValue = formData.get("gambar");

    // Validasi judul
    if (typeof judulValue !== "string") {
      return badRequest("Judul wajib diisi");
    }

    const judul = judulValue.trim();

    if (!judul) {
      return badRequest("Judul wajib diisi");
    }

    // Validasi deskripsi
    if (typeof deskripsiValue !== "string") {
      return badRequest("Deskripsi wajib diisi");
    }

    const deskripsi = deskripsiValue.trim();

    if (!deskripsi) {
      return badRequest(
        "Deskripsi wajib diisi"
      );
    }

    // Validasi tahun
    if (typeof tahunValue !== "string") {
      return badRequest("Tahun wajib diisi");
    }

    const tahun = tahunValue.trim();

    if (!tahun) {
      return badRequest("Tahun wajib diisi");
    }

    // =================================================
    // UPLOAD GAMBAR
    // =================================================

    let gambarUrl: string | null = null;
    let gambarPublicId: string | null = null;

    if (
      gambarValue instanceof File &&
      gambarValue.size > 0
    ) {
      if (!isValidImageFile(gambarValue)) {
        return badRequest(
          "Format gambar harus JPG, PNG, WEBP, atau GIF dan maksimal 5 MB"
        );
      }

      const uploaded = await uploadImage(
        gambarValue,
        "prestasi"
      );

      gambarUrl = uploaded.url;
      gambarPublicId = uploaded.publicId;
    }

    // =================================================
    // INSERT DATABASE
    // =================================================

    await db.insert(prestasi).values({
      judul,
      deskripsi,
      tahun,
      gambarUrl,
      gambarPublicId,
    });

    return ok({
      message: "Prestasi berhasil ditambahkan",
    });
  });
}