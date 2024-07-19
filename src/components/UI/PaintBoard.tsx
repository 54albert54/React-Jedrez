import { generateRandomString } from "../const";

const PaintBoard = ({
  isBlack,
  location,
}: {
  isBlack: boolean;
  location: string;
}) => {
  return (
    <div
      key={generateRandomString(8)}
      className={`${
        isBlack ? "bg-white text-black/60" : "bg-black text-white/60"
      } relative z-0 row w-[54px] h-[54px]   sm:w-16 sm:h-16   flex justify-center items-center  `}
    >
      {location}
    </div>
  );
};

export default PaintBoard;