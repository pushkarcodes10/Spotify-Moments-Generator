import { redirect } from "next/navigation";
import EditorWorkspace from "@/src/components/EditorWorkspace";

interface EditorPageProps {
  searchParams: Promise<{
    trackId?: string;
    name?: string;
    artist?: string;
    thumbnail?: string;
    uri?: string;
  }>;
}

export default async function EditorPage({ searchParams }: EditorPageProps) {
  const params = await searchParams;

  if (!params.trackId) {
    redirect("/");
  }

  return (
    <EditorWorkspace 
      initialTrack={{
        id: params.trackId,
        name: params.name || "Unknown Track",
        artist: params.artist || "Unknown Artist",
        thumbnail: params.thumbnail && params.thumbnail.trim() !== "" ? params.thumbnail : null,
        uri: params.uri || ""
      }}
    />
  );
}