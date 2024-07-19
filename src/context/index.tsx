import { createContext, useContext, useState } from "react";
import { Chess, PieceSymbol } from "chess.js";
interface IGameContext {
  startGame: boolean;
  setStartGame: (startGame: boolean) => void;

  playHistory: string[];
  saveInHistory: (uciMove: string) => void

  lastPieceMovedIA: string
   setLastPieceMovedIA: React.Dispatch<React.SetStateAction<string>>
   allmoves: string[]
   showBoard:  string[]
   makeUserMove: (uci: string) => void
   IAMakeMove: () => IAResponse
   searcByPiece: (piece: PieceSymbol) => void
   kingIsInHake: boolean
}




interface IAResponse {
  moveIsKill: boolean
  to: string
  from: string
  moveSaved: string
}


const GameContext = createContext({
  startGame: false,
  setStartGame: () => { },
  lastPieceMovedIA: "",
  setLastPieceMovedIA: () => { },
  playHistory: [],
  saveInHistory: () => { },
  allmoves: [],
  showBoard: [] as string[],
  makeUserMove: () => { },
  IAMakeMove: () => { },
  searcByPiece: () => { },
  kingIsInHake: false,
} as unknown as IGameContext);


const controlBoard = new Chess();


export const GameContextProvider = ({children}:{children:React.ReactNode}) => {
  const [startGame, setStartGame] = useState(false);
  const [lastPieceMovedIA, setLastPieceMovedIA] = useState("");



  const [playHistory, setPlayHistory] = useState<string[]>([]);

  const saveInHistory = (uciMove: string) => {
   
    setPlayHistory((prev) => [...prev, uciMove]);
  };







//chess IA Controller


const [statusBoard, setStatusBoard] = useState(
  controlBoard.ascii().split("\n")
);
const [kingIsInHake, setKingIsInHake] = useState(false);
const allmoves = controlBoard.moves();



const refrechshowBoard = () => {
  setStatusBoard(controlBoard.ascii().split("\n"));
};


const makeUserMove = (uci: string) => {
  let extraMove = "";

  if (allmoves.includes(uci + "+")) {
    extraMove = "+";
    setKingIsInHake(true);
  }
  if (allmoves.includes(uci + "#")) {
    extraMove = "#";
    setKingIsInHake(true);
  }

  try {
    controlBoard.move(uci + extraMove);
  } catch (error) {
    console.log("error", error);
  }

  refrechshowBoard();
};

const IAMakeMove = () => {
  let moveIsKill = false;
  let moveSaved: string;

  const moves = controlBoard.moves();
  const move = moves[Math.floor(Math.random() * moves.length)] == 'O-O' ? moves[Math.floor(Math.random() * moves.length)] : moves[Math.floor(Math.random() * moves.length)];

  const moveCanBeKill = moves.find((m) => m[1] === "x");

  if (moveCanBeKill) {
    moveSaved = moveCanBeKill;
    controlBoard.move(moveCanBeKill);

    moveIsKill = true;

  } else {
    moveSaved = move;
    controlBoard.move(move);
  }

  refrechshowBoard();
  const history = controlBoard.history({ verbose: true });

  return {
    from: history[history.length - 1].from,
    to: history[history.length - 1].to,
    moveIsKill,
    moveSaved
  };
};

const searcByPiece = (piece: PieceSymbol) => {
  const pieces = controlBoard.moves({ piece: piece });
  return pieces;
};



















  const value = {
    startGame, setStartGame,
    playHistory,saveInHistory,
    lastPieceMovedIA, setLastPieceMovedIA,
    allmoves,
    showBoard: statusBoard,
    makeUserMove,
    IAMakeMove,
    searcByPiece,
    kingIsInHake,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

const useGameContext = () => useContext(GameContext)

export default useGameContext