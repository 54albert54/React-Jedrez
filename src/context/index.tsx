import { createContext, useContext, useState } from "react";

interface IGameContext {
  startGame: boolean;
  setStartGame: (startGame: boolean) => void;

  playHistory: string[];
  saveInHistory: (uciMove: string) => void

  lastPieceMovedIA: string
   setLastPieceMovedIA: React.Dispatch<React.SetStateAction<string>>
}






const GameContext = createContext({
  startGame: false,
  setStartGame: () => {},

  lastPieceMovedIA: "",
  setLastPieceMovedIA: () => {},

  playHistory: [],
  saveInHistory: () => {},

} as IGameContext);


export const GameContextProvider = ({children}:{children:React.ReactNode}) => {
  const [startGame, setStartGame] = useState(false);
  const [lastPieceMovedIA, setLastPieceMovedIA] = useState("");



  const [playHistory, setPlayHistory] = useState<string[]>([]);

  const saveInHistory = (uciMove: string) => {
   
    setPlayHistory((prev) => [...prev, uciMove]);
  };

  const value = {
    startGame, setStartGame,
    playHistory,saveInHistory,
    lastPieceMovedIA, setLastPieceMovedIA
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

const useGameContext = () => useContext(GameContext)

export default useGameContext