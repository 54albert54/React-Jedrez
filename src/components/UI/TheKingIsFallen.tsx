const TheKingIsFallen = ({ isCheckMate }: { isCheckMate?: boolean }) => {
  return (
    <section
      className="absolute z-50 w-[250px] h-[250px] bg-slate-200 shadow-inner translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md  pt-4 "
     
    >
      <div className="flex justify-center my-4 ">
        <p className=" text-center font-semibold text-xl ">
          {isCheckMate ? "Hake Mate" : "Juego terminado"}
        </p>

        <button
            className=" bg-red-800 hover:bg-red-900     text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            resse
          </button>
      </div>
    </section>
  );
};

export default TheKingIsFallen;