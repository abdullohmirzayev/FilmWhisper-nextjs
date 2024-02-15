import React from "react";
import { RowProps } from "./row.props";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import Thumbnail from "../thumbnail/thumbnail";

const Row = ({ title, movies }: RowProps) => {
  return (
    <div className="h-[550px] space-y-1 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm md:text-2xl font-semibold text-[#e5e5e5] hover:text-white transition duration-200">
        {title}
      </h2>

      {/* carouse */}
      <div className="group relative md:ml-2">
        <AiFillCaretLeft className="absolute top-0 bottom-0 left-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125" />
        <div className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <AiFillCaretRight className="absolute top-0 bottom-0 right-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125" />
      </div>
    </div>
  );
};

export default Row;
