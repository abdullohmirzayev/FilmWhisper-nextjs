import { useEffect, useState } from "react";
import { HeroProps } from "./hero.props";
import { IMovie } from "../../interfaces/app.interface";
import Image from "next/image";
import { image_base } from "../../helpers/constants";
import { TbPlayerPlay } from "react-icons/tb";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const Hero = ({ trending }: HeroProps): JSX.Element => {
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)];
    setMovie(randomMovie);
  }, [trending]);

  return (
    <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:center">
      <div className="absolute top-0 -z-10 left-0 h-[95vh] w-full">
        <Image
          src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.name || "movie-image"}
          fill
          className="object-cover"
        />
      </div>

      <div className="py-[4px] px-[8px] text-center rounded-bl-[8px] rounded-tr-[8px] bg-[#e5e5e5]/50  w-[111px]">
        {movie.media_type}
      </div>

      <div className="flex item-center space-x-2">
        {Array.from({ length: Math.floor(movie.vote_average) }, (_, i) => (
          <StarIcon key={i} className="h-4 w-4 text-gray-400" />
        ))}
        {Array.from({ length: 10 - Math.floor(movie.vote_average) }, (_, i) => (
          <StarIconOutline key={i} className="h-4 w-4 text-gray-400" />
        ))}
        <p>({movie.vote_count})</p>
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-xs text-shadow-lg md:text-lg lg:text-2xl">
        {movie?.overview?.slice(0, 130)}...
      </p>
      <div>
        <button className=" flex justify-center items-center space-x-10 bg-white/60 font-bold text-black w-[200px] h-[56px] rounded-full">
          <TbPlayerPlay className="h-5 w-5 md:h8 md:w-8" /> Watch now
        </button>
      </div>
    </div>
  );
};

export default Hero;
