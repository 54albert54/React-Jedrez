import { useEffect } from "react";

import { cols, type Piece } from "./data";
import { uniqueElements } from "./const";
import { movePieceCaballo, movePieceInCruz, movePieceInX, movePieceKing, movePiecePeon } from "./movimientoPiezas";


const Player = ({
  type,
  setShowNextMove,
  pieceSelecteToMove,
  piecesPlayer,
  setPieceSelecteToMove,
  showNextMove,
  enemyPieces,
  isTurnOfPlayer,
  lastPieceMovedIA
  
  
}: {
  piecesPlayer: Piece[];
  type: Piece;
  setShowNextMove: (showNextMove: string[]) => void;
  pieceSelecteToMove: Piece | undefined;
  setPieceSelecteToMove: (pieceSelecteToMove: Piece | undefined) => void;
  enemyPieces: Piece[];
  showNextMove: string[];
  isTurnOfPlayer: boolean;
  lastPieceMovedIA?: string
 
  
}) => {
  const ocupedSpot = [
    ...piecesPlayer.map((piece) => piece.initialPlace),
    ...enemyPieces.map((piece) => piece.initialPlace),
  ];

  const isEnemyInSport = showNextMove.includes(type.initialPlace);
  
  const dataCamaradeOnly = uniqueElements(showNextMove ,enemyPieces.map((piece) => piece.initialPlace));
 
  
  let youCanMove: string[] = [];

  const currentLocation = {
    row: type.initialPlace[0],
    col: Number(type.initialPlace[1]),
  };
  const currentRowIndex = cols.indexOf(currentLocation.row);

useEffect(()=>{
    // check where is peon piece
    // if (type.ficha === "peon" && ( currentLocation.col === 1 || currentLocation.col === 8) ) {
      
       
    // }
  
},[piecesPlayer])




  if (type.ficha === "peon") {
    movePiecePeon({
      type,
      currentLocation,
      youCanMove,
      enemyPieces,
      currentRowIndex,

    });
  } else if (type.ficha === "caballo") {
    movePieceCaballo({
      currentLocation,
      currentRowIndex,
      youCanMove,
      cols,
      type,
    });
  } else if (type.ficha === "alfil") {
    movePieceInX({
      currentRowIndex,
      currentLocation,
      type,
      youCanMove,
      ocupedSpot,
    });
  } else if (type.ficha === "rey") {
    movePieceKing({
      currentLocation,
      currentRowIndex,
      youCanMove,
      cols,
      type,
    })
  } else if (type.ficha === "reina") {
    movePieceInCruz({
      currentRowIndex,
      currentLocation,
      youCanMove,
      ocupedSpot,
    });
    movePieceInX({
      currentRowIndex,
      currentLocation,
      type,
      youCanMove,
      ocupedSpot,
    });
  } else if (type.ficha === "torre") {
    movePieceInCruz({
      currentRowIndex,
      currentLocation,
      youCanMove,
      ocupedSpot,
    });
  } else {
    youCanMove = [];
  }

  
  
  return (
    
      <div
        className={`relative top-[10px]  sm:top-0  flex flex-col justify-center items-center 
         
          ${isTurnOfPlayer === !type.isEnemy && !(isTurnOfPlayer === !type.isEnemy &&
            pieceSelecteToMove?.idPiece === type.idPiece) ? " border-yellow-500 border-[4px] " : " "}
          ${
            isTurnOfPlayer === !type.isEnemy &&
            pieceSelecteToMove?.idPiece === type.idPiece
              ? "bg-yellow-600"
              : ""
          }
           ${
            lastPieceMovedIA === type.idPiece
              ? "border-red-500 border-[4px] "
              : ""
          }

          ${isEnemyInSport   && dataCamaradeOnly.includes(type.initialPlace) ? "bg-red-600" : ""}
          ${
            type.isEnemy ? " " : " "
          } z-90  w-[54px] h-[54px]   sm:w-16 sm:h-16        hover:cursor-pointer flex justify-center items-center  font-normal text-sm  text-white `}
        onClick={() => {
          setShowNextMove(youCanMove);

          if (pieceSelecteToMove === undefined)
            type.isSelected = !type.isSelected;
          // pieceHasMove &&  ;

          setPieceSelecteToMove(type);
        }}
        
      >
        <img
          className={`w-full h-full  ${type?.isEnemy ? "invert" : ""}  `}
          src={`/${type.ficha}-removebg-preview.png`}
          alt=""
        />
      </div>
   
  );
};

export default Player;
