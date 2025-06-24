import { PlayCircle, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";

export default function SpotifyPlaylist() {
  return (
    <section className="w-full bg-[#F1F0EB] px-4 py-12 md:py-24 text-center">
      {/* Headings */}
      <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-[#1a1a1a] uppercase">
        Your Next Favorite Track
      </h3>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mt-2 mb-10">
        Listen to the Collective
      </h2>

      {/* Card */}
      <div className="mx-auto w-full max-w-[801px] bg-[#39A0AC] rounded-xl overflow-hidden shadow-lg text-white text-left">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row px-4 sm:px-6 pt-6 pb-4 gap-4">
          <div className="mx-auto sm:mx-0">
            <Image
              src="/images/HomePage/play.png"
              alt="Playlist Cover"
              width={150}
              height={150}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-bold leading-tight">
              Spotify Singles: Complete Collection
            </h3>
            <p className="text-md font-medium opacity-80">Spotify</p>
            <p className="text-sm mt-1 flex items-center gap-1">
              <span className="text-xl leading-none">⊕</span> Save on Spotify
            </p>
          </div>
          <div className="hidden sm:flex items-start justify-end text-white/80 text-lg">
            🔊
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center sm:justify-end gap-4 px-4 sm:px-6 mb-4">
          <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
          <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
          <div className="text-white font-bold text-lg">...</div>
          <PlayCircle size={35} />
        </div>

        {/* Song List */}
        <div className="bg-[#3BB1BF] px-4 sm:px-6 py-4 space-y-4">
          {[
            { name: "Arcade (Spotify Singles)", duration: "02:39" },
            { name: "Arcade (Spotify Singles)", duration: "02:49" },
            { name: "Arcade (Spotify Singles)", duration: "02:33" },
            { name: "Arcade (Spotify Singles)", duration: "02:39" },
          ].map((track, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm flex-wrap gap-2"
            >
              <div className="flex gap-2 items-start">
                <span className="text-white/80">{i + 1}</span>
                <div>
                  <p className="font-semibold">{track.name}</p>
                  <p className="text-xs text-white/70 -mt-0.5">Listen to</p>
                </div>
              </div>
              <p className="text-white/90 text-sm">{track.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
