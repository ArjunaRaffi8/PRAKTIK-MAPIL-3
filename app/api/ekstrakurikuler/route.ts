import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { badRequest, handleRoute, ok, unauthorized } from "../../../lib/api.response";
import { db } from "../../../config/db";
import { ekstrakurikuler } from "../../../config/schema";
import { getSessionFromCookies } from "../../../lib/auth";
import { deleteImage, isValidImageFile, uploadImage } from "../../../lib/cloudinary";



type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET berdasarkan ID
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  return handleRoute(async () => {
    const { id } = await params;

    const ekstrakurikulerId = Number(id);

    if (Number.isNaN(ekstrakurikulerId)) {
      return badRequest("ID tidak valid");
    }

    const data = await db
      .select()
      .from(ekstrakurikuler)
      .where(
        eq(
          ekstrakurikuler.id,
          ekstrakurikulerId
        )
      )
      .limit(1);

    if (data.length === 0) {
      return badRequest(
        "Data ekstrakurikuler tidak ditemukan"
      );
    }

    return ok(data[0]);
  });
}

// PUT edit ekstrakurikuler
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

    const ekstrakurikulerId = Number(id);

    if (Number.isNaN(ekstrakurikulerId)) {
      return badRequest("ID tidak valid");
    }

    // Cari data lama
    const existingData = await db
      .select()
      .from(ekstrakurikuler)
      .where(
        eq(
          ekstrakurikuler.id,
          ekstrakurikulerId
        )
      )
      .limit(1);

    if (existingData.length === 0) {
      return badRequest(
        "Data ekstrakurikuler tidak ditemukan"
      );
    }

    const existing = existingData[0];

    const formData = await req.formData();

    const namaValue = formData.get("nama");
    const deskripsiValue = formData.get("deskripsi");
    const gambarValue = formData.get("gambar");

    if (
      typeof namaValue !== "string" ||
      typeof deskripsiValue !== "string"
    ) {
      return badRequest(
        "Nama dan deskripsi wajib diisi"
      );
    }

    const nama = namaValue.trim();
    const deskripsi = deskripsiValue.trim();

    if (!nama || !deskripsi) {
      return badRequest(
        "Nama dan deskripsi wajib diisi"
      );
    }

    let gambarUrl = existing.gambarUrl;
    let gambarPublicId = existing.gambarPublicId;

    // Kalau upload gambar baru
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
        "ekstrakurikuler"
      );

      gambarUrl = uploaded.url;
      gambarPublicId = uploaded.publicId;

      // Hapus gambar lama dari Cloudinary
      await deleteImage(existing.gambarPublicId);
    }

    await db
      .update(ekstrakurikuler)
      .set({
        nama,
        deskripsi,
        gambarUrl,
        gambarPublicId,
      })
      .where(
        eq(
          ekstrakurikuler.id,
          ekstrakurikulerId
        )
      );

    const updatedData = await db
      .select()
      .from(ekstrakurikuler)
      .where(
        eq(
          ekstrakurikuler.id,
          ekstrakurikulerId
        )
      )
      .limit(1);

    return ok({
      message:
        "Ekstrakurikuler berhasil diubah",
      data: updatedData[0],
    });
  });
}

// DELETE ekstrakurikuler
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

    const ekstrakurikulerId = Number(id);

    if (Number.isNaN(ekstrakurikulerId)) {
      return badRequest("ID tidak valid");
    }

    // Cari data
    const existingData = await db
      .select()
      .from(ekstrakurikuler)
      .where(
        eq(
          ekstrakurikuler.id,
          ekstrakurikulerId
        )
      )
      .limit(1);

    if (existingData.length === 0) {
      return badRequest(
        "Data ekstrakurikuler tidak ditemukan"
      );
    }

    const existing = existingData[0];

    // Hapus gambar dari Cloudinary
    await deleteImage(existing.gambarPublicId);

    // Hapus data dari database
    await db
      .delete(ekstrakurikuler)
      .where(
        eq(
          ekstrakurikuler.id,
          ekstrakurikulerId
        )
      );

    return ok({
      message:
        "Ekstrakurikuler berhasil dihapus",
    });
  });
}