import { NextRequest, NextResponse } from "next/server";
import { getArtists } from "@/lib/data/artists";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;
    const artists = await getArtists(
      typeof limit === "number" && !Number.isNaN(limit) ? limit : undefined
    );
    return NextResponse.json({ artists });
  } catch (error) {
    console.error("GET /api/artists:", error);
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
