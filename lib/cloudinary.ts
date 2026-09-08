import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const FOLDER = "sekolah"; // semua gambar disimpan di dalam folder ini di Cloudinary

export type UploadResult = {
  url: string;
  publicId: string;
};

/**
 * Upload gambar (dikirim sebagai File dari FormData) ke Cloudinary.
 * subFolder contoh: "berita", "ekstrakurikuler", "sejarah"
 */
export async function uploadImage(
  file: File,
  subFolder: string
): Promise<UploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: `${FOLDER}/${subFolder}`,
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Hapus gambar dari Cloudinary berdasarkan public_id.
 * Aman dipanggil walau publicId null/undefined (akan diabaikan).
 */
export async function deleteImage(publicId?: string | null): Promise<void> {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (err) {
    // Jangan sampai kegagalan hapus gambar lama menggagalkan seluruh request.
    // Cukup log agar bisa dibersihkan manual jika perlu.
    console.error("Gagal menghapus gambar Cloudinary:", publicId, err);
  }
}

/**
 * Validasi dasar file gambar yang diupload (dipakai bersama Zod di route).
 */
export function isValidImageFile(file: File): boolean {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
  return allowedTypes.includes(file.type) && file.size <= maxSizeBytes;
}
