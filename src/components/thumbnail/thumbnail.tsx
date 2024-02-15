import Image from "next/image";
import { ThumbnailProps } from "./thumbnail.props";
import { image_base } from "../../helpers/constants";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const Thumbnail = ({ movie, isBig = false }: ThumbnailProps) => {
  return (
    <div
      className={`relative ${
        isBig
          ? "md:h-[550px] h-[400px] md:min-w-[470px] min-w-[350px]"
          : "md:h-[440px] h-[330px] md:min-w-[292px] min-w-[200px]"
      }cursor-pointer transition duration-200 ease-out md:hover:scale-110`}
    >
      <Image
        src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie?.name || "movie-image"}
        fill
        className="rounded-sm md:rounded object-cover"
      />

      <div className="absolute left-0 right-0 bottom-0 top-0 bg-black/40 w-full h-full" />

      <div className="absolute bottom-5 left-4 right-2">
        <div className="flex item-center space-x-2">
          {Array.from({ length: Math.floor(movie.vote_average) }, (_, i) => (
            <StarIcon key={i} className="h-4 w-4 text-gray-400" />
          ))}
          {Array.from(
            { length: 10 - Math.floor(movie.vote_average) },
            (_, i) => (
              <StarIconOutline key={i} className="h-4 w-4 text-gray-400" />
            )
          )}
        </div>
        <p>({movie.vote_count})</p>
        <h1 className="text-xl font-bold md:text-2xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
      </div>
    </div>
  );
};

export default Thumbnail;
