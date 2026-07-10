import Link from "next/link"
import { redirect } from "next/navigation"
import BlurText from "@/src/components/ui/BlurText"
import { useFileUpload } from "@/src/hooks/use-file-upload";
import { Pattern } from "@/src/components/ui/ImageUploader"

interface EditorPageProps {
    searchParams: Promise<{
        trackId?: string;
        name: string,
        artist?: string;
        thumbnail?: string,
        uri?: string
    }>
}

export default async function EditorPage({searchParams}: EditorPageProps) {
    const params = await searchParams;

    if(!params.trackId) {
       redirect("/")
    }

    return (
      <div className="bg-slate-950 min-h-screen flex flex-col items-center px-4 pt-8 pb-16 sm:pt-10">
        <BlurText
          text="Personalize Your Moment"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-[#E2E2E2] text-2xl sm:text-3xl md:text-4xl italic text-center"
        />
        <BlurText
          text="Design a memory that lasts forever."
          delay={200}
          animateBy="words"
          direction="top"
          className="text-[#BCCBB9] mt-2 text-base sm:text-lg text-center"
        />

        <div className="w-full max-w-5xl mx-auto mt-14 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-5 gap-6 place-items-center">
          <div className="md:col-span-2 w-full max-w-md bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col items-center text-center space-y-4">
            <img
              src={params.thumbnail}
              alt={params.name}
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl shadow-2xl border border-zinc-800"
            />
            <div className="w-full min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                {params.name}
              </h2>
              <p className="text-zinc-400 text-sm truncate">
                {params.artist}
              </p>
            </div>
            <div className="w-full bg-zinc-950 p-2.5 rounded-lg text-left min-w-0">
              <p className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">
                Spotify URI
              </p>
              <p className="text-xs font-mono text-zinc-300 truncate">
                {params.uri}
              </p>
            </div>
            <Link
              href="/"
              className="bg-[#53E076] text-[#003914] p-1 rounded-full text-base sm:text-lg font-extrabold font-mono italic cursor-pointer mt-2 px-3 inline-block"
            >
              ← Change Song
            </Link>
          </div>

          <div className="md:col-span-3 w-full max-w-lg bg-zinc-900 border border-zinc-800 p-4 sm:p-6 rounded-2xl flex flex-col gap-4 h-96">
            <h3 className="text-2xl sm:text-3xl font-semibold text-green-400 text-center mb-2 italic">
              Customize Your Moment 😉
            </h3>

            <Pattern />

            <input
              maxLength={120}
              className="w-full bg-white p-2 rounded-2xl text-center placeholder:text-black text-base sm:text-lg"
              placeholder="Your Message..."
              type="text"
            />

            <input
              className="w-full bg-white p-2 rounded-2xl placeholder:text-black text-base sm:text-lg"
              type="date"
            />

            <div className="w-full flex justify-center mt-2">
              <Link
                href="/moment"
                className="bg-[#53E076] text-[#003914] p-1 rounded-full text-base sm:text-lg font-extrabold font-mono italic cursor-pointer px-3 w-fit whitespace-nowrap"
              >
                Your Card... →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}