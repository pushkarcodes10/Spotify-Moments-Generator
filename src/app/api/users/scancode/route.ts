import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");

  if (!uri) {
    return NextResponse.json({ error: "URI is required" }, { status: 400 });
  }

  if (!uri.startsWith("spotify:track:")) {
    return NextResponse.json({ error: "Invalid Spotify track URI" }, { status: 400 });
  }

  try {
    const targetUrl = `https://scannables.scdn.co/uri/plain/svg/000000/white/640/${encodeURIComponent(uri)}`;

    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch code from Spotify (status ${response.status})`);
    }

    const svgData = await response.text();

    return new NextResponse(svgData, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}