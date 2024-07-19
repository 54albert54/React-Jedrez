import { generateRandomString } from "../const";
import { useRef, useEffect } from "react";
import { Piece } from "../data";

const Summary = ({

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
      className="absolute flex  z-50 w-[350px] h-[350px] px-6 bg-slate-200 shadow-inner translate-y-1/4 left-1/2 -translate-x-1/2 rounded-md  pt-4 "
    >
      <div className="w-full h-[70%] flex flex-col justify-between px-3">
      <p className="text-center font-semibold text-xl mt-2">UCI Board</p>
        {children}


       
      </div>
      <div className=" w-full relative bg-slate-200  py-1 rounded-b-md ">
      <p className=" text-center font-semibold text-xl ">historial</p>
      <div
          ref={scrollContainerRef}
          className="  w-full h-[80%]  p-2 overflow-scroll border-black border-2 rounded-lg bg-gray-50 "
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
    </section>
  );
};

export default Summary;
