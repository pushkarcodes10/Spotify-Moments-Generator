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
      <div className="bg-slate-950 min-h-screen flex flex-col items-center pt-10">
        <BlurText
          text="Personalize Your Moment"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-[#E2E2E2] text-4xl italic"
        />
        <BlurText
          text="Design a memory that lasts forever."
          delay={200}
          animateBy="words"
          direction="top"
          className="text-[#BCCBB9] mt-2 text-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute bottom-25 right-54">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col items-center text-center space-y-4">
            <img
              src={params.thumbnail}
              alt={params.name}
              className="w-40 h-40 object-cover rounded-xl shadow-2xl border border-zinc-800"
            />
            <div>
              <h2 className="text-xl font-bold text-white truncate max-w-55">
                {params.name}
              </h2>
              <p className="text-zinc-400 text-sm truncate max-w-55">
                {params.artist}
              </p>
            </div>
            <div className="w-full bg-zinc-950 p-2.5 rounded-lg text-left">
              <p className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">
                Spotify URI
              </p>
              <p className="text-xs font-mono text-zinc-300 truncate">
                {params.uri}
              </p>
            </div>
              <Link 
                href="/"
                className="bg-[#53E076] text-[#003914] p-1 rounded-full text-lg font-extrabold font-mono italic cursor-pointer mt-2 px-3"
        >       ← Change Song 
              </Link>
          </div>

          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 flex justify-around flex-col">
            <h3 className="text-3xl font-semibold text-green-400 text-center mb-5 italic">
              Customize Your Moment 😉
            </h3>
              <Pattern />
              <input 
              className="w-full bg-white p-2 rounded-2xl mt-5 text-center placeholder:text-black  text-lg"
              placeholder="Your Message..."
              type="text"
              />
              <input 
              className="w-full bg-white p-2 rounded-2xl mt-5 placeholder:text-black text-lg"
              type="date"
              />
              <Link 
                href="/moment"
                className="bg-[#53E076] text-[#003914] p-1 rounded-full text-lg font-extrabold font-mono italic cursor-pointer mt-2 px-3 ml-44 w-fit"
                >       Your Card... →
              </Link>
            </div>
          </div>
        </div>
    );
}