import { generateRandomString } from "../const";
import { useRef, useEffect } from "react";
import { Piece } from "../data";

const Summary = ({
  isTurnOfPlayer,
  piecesPlayer1,
  piecesPlayer2,
  setShowSummary,
  setShowAlert,
  children,
  playHistory,
}: {
  isTurnOfPlayer: boolean;
  piecesPlayer1: Piece[];
  piecesPlayer2: Piece[];
  setShowSummary: (state: boolean) => void;
  setShowAlert: (state: boolean) => void;
  children: React.ReactNode;
  playHistory: string[];
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [playHistory]);
  return (
    <section
      id="UI"
      onClick={() => {
        setShowSummary(false), setShowAlert(false);
      }}
      className="absolute  z-50 w-[250px] h-[250px] bg-slate-200 shadow-inner translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md  pt-4 "
    >
      <div className="w-full h-[70%] flex flex-row px-3">
        {children}
        <div
          ref={scrollContainerRef}
          className="  w-full h-[80%]  p-2 overflow-scroll  "
        >
          {
             playHistory.map((move, index) => {
              return (
                <div key={generateRandomString(2)}>
                  <p>
                    
                    <span className="font-bold text-[10px]">
                      {index + 1} -
                    </span>{" "}
                    {move}
                  </p>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className=" w-full relative bg-slate-200  py-1 rounded-b-md ">
        <div className="flex justify-around h-full px-6  text-sm">
          <p
            className={`
     ${
       isTurnOfPlayer
         ? "bg-emerald-100 text-emerald-700 border-emerald-700 w-28 h-8 "
         : "bg-gray-100 text-gray-500 border-gray-800 w-28 h-8 "
     } 
     inline-flex items-center justify-center rounded-full my-auto  px-2.5 py-0.5 border  transition-all duration-200 ease-in-out
     `}
          >
            Blancas: {piecesPlayer1.length}
          </p>
          <p className="flex h-full justify-center items-center  my-auto w-4">
            {isTurnOfPlayer ? "<" : ">"}
          </p>
          <p
            className={`
    ${
      !isTurnOfPlayer
        ? "bg-emerald-100 text-emerald-700 border-emerald-700 w-28 h-8"
        : "bg-gray-100 text-gray-500 border-gray-800 w-28 h-8 "
    } "}
    inline-flex items-center justify-center rounded-full   my-auto border  transition-all duration-200 ease-in-out
    `}
          >
            Negras: {piecesPlayer2.length}
          </p>
        </div>

        <div className="flex justify-center my-4 ">
          <button
            className=" bg-red-800 hover:bg-red-900     text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            resse
          </button>
        </div>
      </div>
    </section>
  );
};

export default Summary;
