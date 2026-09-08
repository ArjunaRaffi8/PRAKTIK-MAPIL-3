import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

export function badRequest(message = "Bad Request") {
  return NextResponse.json({ success: false, message }, { status: 400 });
}

export function serverError(message = "Terjadi kesalahan server") {
  return NextResponse.json({ success: false, message }, { status: 500 });
}

export async function handleRoute(fn: () => Promise<Response>) {
  try {
    return await fn();
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.name === "ZodError") {
      return badRequest("Data tidak valid");
    }

    return serverError();
  }
}