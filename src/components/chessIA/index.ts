import { Chess, PieceSymbol } from "chess.js";
import { useState } from "react";

export const piecesToUci = {
  peon: "p",
  torre: "r",
  caballo: "n",
  alfil: "b",
  rey: "k",
  reina: "q",
};

const controlBoard = new Chess();

const useChessBoard = () => {
  const [statusBoard, setStatusBoard] = useState(
    controlBoard.ascii().split("\n")
  );
  const [kingIsInHake, setKingIsInHake] = useState(false);

  const refrechshowBoard = () => {
    setStatusBoard(controlBoard.ascii().split("\n"));
  };
  const allMove = controlBoard.moves();

  const makeUserMove = (uci: string) => {
    let extraMove = "";

    if (allMove.includes(uci + "+")) {
      extraMove = "+";
      setKingIsInHake(true);
    }
    if (allMove.includes(uci + "#")) {
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

    const moves = controlBoard.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];

    const moveCanBeKill = moves.find((m) => m[1] === "x");

    if (moveCanBeKill) {
      controlBoard.move(moveCanBeKill);

      moveIsKill = true;
    } else {
      controlBoard.move(move);
    }

    refrechshowBoard();
    const history = controlBoard.history({ verbose: true });
    console.log("the last move in inventary", history[history.length - 1]);

    return {
      from: history[history.length - 1].from,
      to: history[history.length - 1].to,
      moveIsKill,
    };
  };

  const searcByPiece = (piece: PieceSymbol) => {
    const pieces = controlBoard.moves({ piece: piece });
    return pieces;
  };

  return {
    allMove,
    showBoard: statusBoard,
    makeUserMove,
    IAMakeMove,
    searcByPiece,
    kingIsInHake,
  };
};

export default useChessBoard;
