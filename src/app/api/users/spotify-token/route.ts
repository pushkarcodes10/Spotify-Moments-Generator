import { NextRequest, NextResponse } from "next/server";

interface tokenCache  {
  accessToken: string | null
  expiryTime: number | null
}

declare global {
  var spotifyTokenCache: tokenCache | undefined
}

if (!globalThis.spotifyTokenCache) {
  globalThis.spotifyTokenCache = {
    accessToken: null,
    expiryTime: null,
  };
}

const tokenCache = globalThis.spotifyTokenCache;

export async function POST(request:NextRequest) {

    const currentTime = Date.now()

    if(tokenCache.accessToken && tokenCache.expiryTime && currentTime < (tokenCache.expiryTime - 60000)) {
      return NextResponse.json({
        success: true,
        source: "cache",
        access_token: tokenCache.accessToken,
        expires_at: new Date(tokenCache.expiryTime).toLocaleTimeString()
      })
    }

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.SPOTIFY_CLIENT_ID!,
          client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
        }),
      });
  
      if(!response.ok) {
        return NextResponse.json(
          {error: "Spotify Auth Failed", success: false},
          {status: 502}
        )
      }

      const data = await response.json()

      tokenCache.accessToken = data.access_token
      tokenCache.expiryTime = Date.now() + (data.expires_in * 1000)

      return NextResponse.json({
        success: true,
        source: "spotify_api",
        access_token: tokenCache.accessToken,
        expires_at: new Date(tokenCache.expiryTime).toLocaleTimeString()
      })

    } catch (error: any) {
      return NextResponse.json(
        {error: error.message},
        {status: 500}
      )
    }
}