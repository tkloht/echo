import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const maximumDelay = 20000;

async function handleRequest(request: NextRequest) {
  const searchParams = new URLSearchParams(request.nextUrl.search);
  const delay = Number(searchParams.get("delay"));

  let body;

  if (request.body) {
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid json" }, { status: 422 });
    }
  }

  if (delay) {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(delay, maximumDelay))
    );
  }

  return NextResponse.json(
    {
      body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    }
  );
}

export const GET = handleRequest;
export const POST = handleRequest;
export const DELETE = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
