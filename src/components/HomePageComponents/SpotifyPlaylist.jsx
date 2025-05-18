// components/SpotifyPlaylist.tsx

import { PlaneIcon, Play, PlayCircle, SkipBack, SkipForward, SkipForwardIcon } from "lucide-react";
import Image from "next/image";

export default function SpotifyPlaylist() {
    return (
        <section className="w-full bg-[#F1F0EB] px-4 py-20 text-center font-sans">
            {/* Headings */}
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-[#1a1a1a] uppercase">
                Your Next Favorite Track
            </h3>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mt-1 mb-10">
                Listen to the Collective
            </h2>

            {/* Card */}
            <div className="mx-auto w-[801px]  bg-[#39A0AC] rounded-xl overflow-hidden shadow-lg text-white text-left">
                {/* Top Section */}
                <div className="flex px-6 pt-6 pb-4">
                    <Image
                        src="/images/HomePage/play.png" // Your updated path
                        alt="Playlist Cover"
                        width={150}
                        height={150}
                        className="rounded-md object-cover"
                    />
                    <div className="ml-4 flex flex-col justify-center">
                        <h3 className="text-lg font-bold leading-tight">
                            Spotify Singles: Complete Collection
                        </h3>
                        <p className="text-md font-medium opacity-80">Spotify</p>

                        <p className="text-sm mt-1 flex items-center gap-1">
                            <span className="text-xl leading-none">⊕</span> Save on Spotify
                        </p>
                    </div>
                    <div className="ml-auto self-start text-white/80 text-lg">🔊</div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-end gap-4 px-6 mb-4">
                    <SkipBack />
                    <SkipForward />
                    <div className="text-white  font-bold">...</div>
                    <PlayCircle  size={35}/>
                </div>

                {/* Song List */}
                <div className="bg-[#3BB1BF] px-6 py-4 h-full space-y-4">
                    {[
                        { name: "Arcade (Spotify Singles)", duration: "02:39" },
                        { name: "Arcade (Spotify Singles)", duration: "02:49" },
                        { name: "Arcade (Spotify Singles)", duration: "02:33" },
                        { name: "Arcade (Spotify Singles)", duration: "02:39" },
                    ].map((track, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center text-sm"
                        >
                            <div className="flex gap-2">
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
