import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
       return NextResponse.json(
         { error: "Query parameter 'q' is required" },
         { status: 400 },
       );
    }

    try {
        const origin = request.nextUrl.origin
        const authResponse = await fetch(`${origin}/api/users/spotify-token`, {method: "POST"})
        const authData = await authResponse.json()

        if(!authData.success) {
            return NextResponse.json({ error: "Failed to get Spotify Token"}, {status: 404});
        }

        const token = authData.access_token

       const spotifyResponse = await fetch(
         `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         },
       );

       if(!spotifyResponse.ok) {
        return NextResponse.json(
          { error: "Spotify Search Failed" },
          { status: spotifyResponse.status },
        );
       }

        const spotifyData = await spotifyResponse.json();

        const cleanTracks = spotifyData.tracks.items.map((track: any) => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(", "),
          album: track.album.name,
          thumbnail: track.album.images[2]?.url || track.album.images[0]?.url || "",
          previewUrl: track.preview_url,
          uri: track.uri
        }));

        return NextResponse.json({ success: true, tracks: cleanTracks });

    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}