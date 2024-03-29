import MuiModal from "@mui/material/Modal";
import { useInfoStore } from "src/store";
import { FaTimes, FaPlay, FaPause } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Element } from "src/interfaces/app.interface";
import ReactPlayer from "react-player";
import { BiPlus } from "react-icons/bi";
import { BsVolumeMute, BsVolumeDown } from "react-icons/bs";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { db } from "src/firebase";
import { AuthContext } from "src/context/auth.context";
import { useRouter } from "next/router";
import { Button, IconButton, Snackbar } from "@mui/material";

const Modal = () => {
  const { modal, setModal, currentMovie } = useInfoStore();
  const [trailer, setTrailer] = useState<string>("");
  const [muted, setMuted] = useState<boolean>(true);
  const [like, setLike] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleCloses = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

  const api = `${base_url}/${
    currentMovie?.media_type === "tv" ? "tv" : "movie"
  }/${currentMovie.id}/videos?api_key=${api_key}&language=en-US`;

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then((res) => res.json());
      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data?.results[index]?.key);
      }
    };
    fetchVideoData();

    // eslint-disable-next-line
  }, [currentMovie]);

  const addProductList = async () => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "list"), {
        userId: user?.uid,
        product: currentMovie,
      });
      setIsLoading(false);
      router.replace(router.asPath);
      setOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
    }
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloses}
      >
        <AiOutlineCloseCircle className="w-7 h-7" />
      </IconButton>
    </>
  );

  return (
    <MuiModal
      open={modal}
      onClose={handleClose}
      className={
        "fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
      }
    >
      <>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloses}
          message="Success"
          action={action}
        />
        <button
          onClick={() => setModal(false)}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]"
        >
          <FaTimes />
        </button>

        <div className="relative pt-[55%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width={"100%"}
            height={"100%"}
            playing={playing}
            style={{ position: "absolute", top: 0, left: 0 }}
            muted={muted}
          />
          <div className=" absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                onClick={() => setPlaying((prev) => !prev)}
                className=" flex items-center gap-2 rounded bg-white px-8 py-4 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
              >
                {playing ? (
                  <>
                    <FaPause className="h-7 w-7 text-black" />
                    Pause
                  </>
                ) : (
                  <>
                    <FaPlay className="h-7 w-7 text-black" />
                    Play
                  </>
                )}
              </button>
              <button onClick={addProductList} className="modalButton mt-2">
                {isLoading ? "..." : <BiPlus className="w-7 h-7" />}
              </button>
              <button
                className="modalButton mt-2"
                onClick={() => setLike((prev) => !prev)}
              >
                {like ? (
                  <AiOutlineLike className="w-7 h-7" />
                ) : (
                  <AiFillLike className="w-7 h-7" />
                )}
              </button>
            </div>
            <button
              className="modalButton mt-2"
              onClick={() => setMuted((prev) => !prev)}
            >
              {muted ? (
                <BsVolumeMute className="w-7 h-7" />
              ) : (
                <BsVolumeDown className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-1g">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">{currentMovie?.release_date}</p>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <span className="text-[gray]">Original language :</span>{" "}
                {currentMovie?.original_language}
              </div>
              <>
                <span className="text-[gray]">Original language :</span>{" "}
                {currentMovie?.vote_count}
              </>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
