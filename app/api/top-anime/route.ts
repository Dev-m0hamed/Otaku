import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime");
  const data = await res.json();
  return NextResponse.json(data);
}
