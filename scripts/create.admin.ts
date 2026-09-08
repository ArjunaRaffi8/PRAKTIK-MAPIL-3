
import * as dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as schema from "../config/schema";

async function main() {
  const [, , argNama, argEmail, argPassword] = process.argv;

  const nama = argNama || process.env.ADMIN_SEED_NAME || "Administrator";
  const email = argEmail || process.env.ADMIN_SEED_EMAIL;
  const password = argPassword || process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    console.error(
      "Email dan password wajib diisi. Contoh:\n" +
        '  npx tsx scripts/create-admin.ts "Nama Admin" "admin@sekolah.sch.id" "passwordAman123"'
    );
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL belum diset di .env");
    process.exit(1);
  }

  const pool = mysql.createPool({ uri: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema, mode: "default" });

  const [existing] = await db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.email, email));

  if (existing) {
    console.error(`Admin dengan email "${email}" sudah ada.`);
    await pool.end();
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.insert(schema.admins).values({
    nama,
    email,
    password: hashed,
  });

  console.log("Admin berhasil dibuat:");
  console.log(`  Nama : ${nama}`);
  console.log(`  Email: ${email}`);
  console.log("Silakan login di /admin/login menggunakan kredensial di atas.");

  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Gagal membuat admin:", err);
  process.exit(1);
});
