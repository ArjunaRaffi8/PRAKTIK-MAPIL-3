import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

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

export type Kontak = typeof kontak.$inferSelect;
