"use client"

import { useState } from "react"
import type { MusicTrack } from "@/types"

interface MusicCardProps {
  track: MusicTrack
}

export default function MusicCard({ track }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="cinematic-card p-6 hover:bg-white/5 transition-all duration-300 flex items-center gap-4">
      {track.preview_url && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-black hover:scale-110 transition-transform duration-300"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      )}

      <div className="flex-grow">
        <h3 className="font-bold text-white mb-1">{track.name}</h3>
        <p className="text-sm text-gray-400">{track.artist}</p>
      </div>

      {track.external_urls?.spotify && (
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-4 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors text-sm font-medium"
        >
          Spotify
        </a>
      )}

      {track.preview_url && isPlaying && (
        <audio autoPlay src={track.preview_url} onEnded={() => setIsPlaying(false)} className="hidden" />
      )}
    </div>
  )
}
