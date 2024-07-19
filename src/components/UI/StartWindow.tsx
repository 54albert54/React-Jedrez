const StartWindow = ({
  setStartGame,
  setShowAlert,
  setPlayerVSPlayer,
}: {
  setStartGame: (state: boolean) => void;
  setShowAlert:   (state: boolean) => void;
  setPlayerVSPlayer: (state: boolean) => void;
}) => {
  return (
    <section className="absolute z-50 w-[250px] h-[250px] bg-slate-200 shadow-inner translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md  pt-4 ">
      <p className=" text-center font-semibold text-xl ">Elige Modo Juego</p>

      <ul>
        <li
          onClick={() => {
            setStartGame(true);
            setShowAlert(false);
            setPlayerVSPlayer(true);
          }}
          className="flex justify-center items-center cursor-pointer my-4  bg-white w-32 mx-auto rounded-full border   border-emerald-500 px-2.5 py-0.5 text-emerald-700 active:bg-emerald-400 active:text-teal-50 hover:bg-emerald-300 shadow-md"
        >
          <p>PVE</p>
        </li>

        <li
          onClick={() => {
            setStartGame(true);
            setShowAlert(false);
            setPlayerVSPlayer(false);
          }}
          className="flex justify-center items-center cursor-pointer my-4  bg-white w-32 mx-auto rounded-full border   border-emerald-500 px-2.5 py-0.5 text-emerald-700 active:bg-emerald-400 active:text-teal-50 hover:bg-emerald-300 shadow-md"
        >
          <p>PVC</p>
        </li>

        <li>
          {/* <div className="flex items-center justify-center flex-col ">
            <p>Dificultad</p>
            <div>
              {[1, 2, 3].map((dificulty) => (
                <button
                  key={dificulty}
                  className="w-10 mt-2 mx-4 bg-white rounded-full border   border-blue-500 px-2.5 py-0.5 text-blue-700 active:bg-blue-400 active:text-teal-50 hover:bg-blue-300 shadow-md"
                >
                  {dificulty}
                </button>
              ))}
            </div>
          </div> */}
        </li>
      </ul>
    </section>
  );
};

export default StartWindow; 