import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/mysql-core";

import { z } from "zod";

export const informasiSchema = z.object({
  judul: z.string().min(1),
  isi: z.string().min(1),
});

// =====================================================
// TABEL: admins
// =====================================================
export const admins = mysqlTable("admins", {
  id: int("id").autoincrement().primaryKey(),
  nama: varchar("nama", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // hashed (bcrypt)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// =====================================================
// TABEL: informasi
// =====================================================
export const informasi = mysqlTable(
  "informasi",
  {
    id: int("id").autoincrement().primaryKey(),
    judul: varchar("judul", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 220 }).notNull().unique(),
    isi: text("isi").notNull(),
    gambarUrl: varchar("gambarUrl", { length: 500 }),
    gambarPublicId: varchar("gambarPublicId", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    slugIdx: index("slug_idx").on(table.slug),
  })
);

// =====================================================
// TABEL: ekstrakurikuler
// =====================================================
export const ekstrakurikuler = mysqlTable("ekstrakurikuler", {
  id: int("id").autoincrement().primaryKey(),
  nama: varchar("nama", { length: 150 }).notNull(),
  deskripsi: text("deskripsi").notNull(),
  gambarUrl: varchar("gambarUrl", { length: 500 }),
  gambarPublicId: varchar("gambarPublicId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const guru = mysqlTable("guru", {
  id: int("id").autoincrement().primaryKey(),
  nama: varchar("nama", { length: 150 }).notNull(),
  nip: varchar("nip", { length: 50 }),
  mataPelajaran: varchar("mataPelajaran", { length: 150 }),
  jabatan: varchar("jabatan", { length: 150 }),
  fotoUrl: varchar("fotoUrl", { length: 500 }),
  fotoPublicId: varchar("fotoPublicId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// =====================================================
// TABEL: prestasi
// =====================================================

export const prestasi = mysqlTable("prestasi", {
  id: int("id").autoincrement().primaryKey(),
  judul: varchar("judul", { length: 200 }).notNull(),
  deskripsi: text("deskripsi").notNull(),
  tahun: varchar("tahun", { length: 20 }).notNull(),
  gambarUrl: varchar("gambarUrl", { length: 500 }),
  gambarPublicId: varchar("gambarPublicId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// =====================================================
// TABEL: sejarah
// =====================================================
export const sejarah = mysqlTable("sejarah", {
  id: int("id").autoincrement().primaryKey(),
  tahun: varchar("tahun", { length: 20 }).notNull(),
  judul: varchar("judul", { length: 200 }).notNull(),
  deskripsi: text("deskripsi").notNull(),
  gambarUrl: varchar("gambarUrl", { length: 500 }),
  gambarPublicId: varchar("gambarPublicId", { length: 255 }),
  urutan: int("urutan").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// =====================================================
// TABEL: kontak
// =====================================================
export const kontak = mysqlTable("kontak", {
  id: int("id").autoincrement().primaryKey(),
  nama: varchar("nama", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  subjek: varchar("subjek", { length: 200 }).notNull(),
  pesan: text("pesan").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Admin = typeof admins.$inferSelect;
export type Informasi = typeof informasi.$inferSelect;
export type Ekstrakurikuler = typeof ekstrakurikuler.$inferSelect;
export type Guru = typeof guru.$inferSelect;
export type Prestasi = typeof prestasi.$inferSelect;
export type Sejarah = typeof sejarah.$inferSelect;
export type Kontak = typeof kontak.$inferSelect;

