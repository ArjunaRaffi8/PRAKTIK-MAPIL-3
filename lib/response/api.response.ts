import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function created(data: unknown) {
  return ok(data, 201);
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status: 400 }
  );
}

export function unauthorized(message = "Anda harus login sebagai admin") {
  return NextResponse.json(
    { success: false, error: message },
    { status: 401 }
  );
}

export function forbidden(message = "Anda tidak memiliki akses") {
  return NextResponse.json(
    { success: false, error: message },
    { status: 403 }
  );
}

export function notFound(message = "Data tidak ditemukan") {
  return NextResponse.json(
    { success: false, error: message },
    { status: 404 }
  );
}

export function serverError(err: unknown) {
  console.error(err);
  return NextResponse.json(
    { success: false, error: "Terjadi kesalahan pada server" },
    { status: 500 }
  );
}

/**
 * Bungkus handler route dengan try/catch standar,
 * termasuk penanganan khusus untuk ZodError.
 */
export async function handleRoute(
  fn: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ZodError) {
      return badRequest("Validasi gagal", err.flatten().fieldErrors);
    }
    return serverError(err);
  }
}
