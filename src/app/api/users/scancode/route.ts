import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");

  if (!uri) {
    return NextResponse.json({ error: "URI is required" }, { status: 400 });
  }

  try {
    const cleanUri = uri.replaceAll(":", "-");
    const targetUrl = `https://scancode.com/api/v1/generated/svg/${cleanUri}.svg`;
    
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error("Failed to fetch code from Spotify");
    }

    const svgData = await response.text();

    return new NextResponse(svgData, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}