import type { MovieRecommendation } from "@/types"

interface MovieCardProps {
  movie: MovieRecommendation
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="cinematic-card p-6 hover:scale-105 transition-transform duration-300 h-full flex flex-col">
      <div className="w-full aspect-[2/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center border border-gray-700">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-gray-500 text-center">
            <div className="text-sm">포스터 없음</div>
          </div>
        )}
      </div>

      <h3 className="font-bold text-lg mb-2 text-white line-clamp-2">{movie.title}</h3>

      {movie.release_date && <p className="text-sm text-gray-400 mb-3">{new Date(movie.release_date).getFullYear()}</p>}

      {movie.vote_average && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary">★</span>
          <span className="text-sm text-gray-300">{movie.vote_average.toFixed(1)}</span>
        </div>
      )}

      {movie.overview && <p className="text-sm text-gray-400 line-clamp-3 flex-grow">{movie.overview}</p>}
    </div>
  )
}
