import Image from "next/image";
import { ThumbnailProps } from "./thumbnail.props";
import { image_base } from "../../helpers/constants";

const Thumbnail = ({ movie }: ThumbnailProps) => {
  return (
    <div className="relative h-[330px] min-w-[200px] cursor-pointer transition duration-200 ease-out md:h-[440px] md:min-w-[292px] md:hover:scale-110">
      <Image
        src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie?.name || "movie-image"}
        fill
        className="rounded-sm md:rounded object-cover"
      />
    </div>
  );
};

export default Thumbnail;
