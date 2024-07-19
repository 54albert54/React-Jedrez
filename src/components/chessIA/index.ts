import { PieceSymbol } from "chess.js";


export const piecesToUci: Record< string , PieceSymbol> = {
  peon: "p",
  torre: "r",
  caballo: "n",
  alfil: "b",
  rey: "k",
  reina: "q",
};





const useChessBoard = () => {



  return {
    allmoves,
    showBoard: statusBoard,
    makeUserMove,
    IAMakeMove,
    searcByPiece,
    kingIsInHake,
    
  };
};

export default useChessBoard;
