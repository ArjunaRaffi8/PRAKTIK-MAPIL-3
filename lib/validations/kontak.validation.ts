import { z } from "zod";

// ---------- Kontak ----------

export const kontakCreateSchema = z.object({
  nama: z.string().min(2, "Nama minimal 5 karakter").max(100),
  email: z.string().email("Format email tidak valid"),
  subjek: z.string().min(3, "Subjek minimal 3 karakter").max(200),
  pesan: z.string().min(10, "Pesan minimal 10 karakter"),
});

// ---------- Param umum ----------

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("ID tidak valid"),
});
