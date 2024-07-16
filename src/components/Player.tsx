import { useState } from "react";

import { cols, type Piece } from "./data";
import { uniqueElements } from "./const";

const movePiecePeon = ({
  type,
  currentLocation,
  youCanMove,
  enemyPieces,
  currentRowIndex,

}: {
  type: Piece;
  currentLocation: { row: string; col: number };
  youCanMove: string[];
  enemyPieces: Piece[];
  currentRowIndex: number;
 
}) => {
  
  
    
    
    const validCol = !type.isEnemy ? [
     
      currentLocation.col + 1,
      Number(type.initialPlace[1]) == 2 && currentLocation.col + 2,
    ]:[
      currentLocation.col - 1,
      Number(type.initialPlace[1]) == 7 && currentLocation.col - 2,
    ]
    const validRow = [cols[currentRowIndex]];

    for (let i = 0; i < validRow.length; i++) {
      for (let j = 0; j < validCol.length ; j++) {
        const createdLocation = validRow[i] + validCol[j]; // validCol.length
      
       
        const hasEnemy = enemyPieces
          .map((piece) => piece.initialPlace)
          .includes(createdLocation);
        
  
        type.initialPlace != createdLocation &&
          !hasEnemy &&
          youCanMove.push(createdLocation);

          if (hasEnemy) {
            break; // Termina el bucle si se encuentra una ubicación ocupada
          }

      }}


    const searchEnemyLeft = type.isEnemy
      ? cols[currentRowIndex - 1] + `${currentLocation.col - 1}`
      : cols[currentRowIndex - 1] + `${currentLocation.col + 1}`;

   
      
    const searchEnemyRight = type.isEnemy
      ? cols[currentRowIndex + 1] + `${currentLocation.col - 1}`
      : cols[currentRowIndex + 1] + `${currentLocation.col + 1}`;
    //  console.log('searchEnemyRight',searchEnemyRight);

    if (
      enemyPieces.map((piece) => piece.initialPlace).includes(searchEnemyLeft)
    ) {
      youCanMove.push(searchEnemyLeft);
    }
    if (
      enemyPieces.map((piece) => piece.initialPlace).includes(searchEnemyRight)
    ) {
      youCanMove.push(searchEnemyRight);
    }
  
};
const movePieceInX = ({
  currentRowIndex,
  currentLocation,
  type,
  youCanMove,
  ocupedSpot,
}: {
  currentRowIndex: number;
  currentLocation: { row: string; col: number };
  type: Piece;
  youCanMove: string[];
  ocupedSpot: string[];
}) => {
  const validCol = [];

  for (let i = 0; i < 9; i++) {
    validCol.push(i);
  }

  const validRowLeftUp = [];
  const validRowLeftDown = [];

  for (let a = 1; a < 9; a++) {
    validRowLeftUp.push(cols[currentRowIndex - a]);
  }

  for (let a = 0; a < 9; a++) {
    validRowLeftDown.push(cols[currentRowIndex - a - 1]);
  }

  const validRowRightUp = [];
  const validRowRightDown = [];

  for (let a = currentLocation.col; a > 0; a--) {
    cols[currentRowIndex + a] &&
      validRowRightUp.unshift(cols[currentRowIndex + a]);
  }
  for (let a = 9; a > 0; a--) {
    cols[currentRowIndex + a] &&
      validRowRightDown.unshift(cols[currentRowIndex + a]);
  }

  // Left Up
  for (let i = 0; i < validRowLeftUp.length; i++) {
    const createdLocation = validRowLeftUp[i] + (currentLocation.col - (i + 1));
    type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }

  // Left Down
  for (let i = 0; i < 9; i++) {
    const createdLocation =
      validRowLeftDown[i] + (currentLocation.col + (i + 1));
    type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }
  // Right Up
  for (let i = 0; i < validRowRightUp.length; i++) {
    const createdLocation =
      validRowRightUp[i] + (currentLocation.col - (i + 1));
    type.initialPlace != createdLocation && youCanMove.push(createdLocation);

    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }

  // Right Down
  for (let i = 0; i < validRowRightDown.length; i++) {
    const createdLocation =
      validRowRightDown[i] + (currentLocation.col + (i + 1));
    type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }
};

const movePieceInCruz = ({
  currentLocation,
  currentRowIndex,
  youCanMove,
  ocupedSpot,
}: {
  currentRowIndex: number;
  currentLocation: { row: string; col: number };
  youCanMove: string[];
  ocupedSpot: string[];
}) => {
  for (let i = currentLocation.col - 1; i > 0; i--) {
    //vertical Up
    const createdLocation = currentLocation.row + i;
    youCanMove.push(createdLocation);

    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }
  for (let i = currentLocation.col + 1; i < 8; i++) {
    //vertical  down

    const createdLocation = currentLocation.row + i;
    youCanMove.push(createdLocation);

    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }

  for (let i = currentRowIndex + 1; i < 8; i++) {
    // horizontal right
    const createdLocation = cols[i] + currentLocation.col;
    youCanMove.push(createdLocation);
    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }

  for (let i = currentRowIndex - 1; i > -1; i--) {
    // horizontal left
    const createdLocation = cols[i] + currentLocation.col;
    youCanMove.push(createdLocation);
    if (ocupedSpot.includes(createdLocation)) {
      break; // Termina el bucle si se encuentra una ubicación ocupada
    }
  }
};
const movePieceCaballo = ({
  currentLocation,
  currentRowIndex,
  youCanMove,
  cols,
  type,
}: {
  currentLocation: { row: string; col: number };
  currentRowIndex: number;
  youCanMove: string[];
  cols: string[];
  type: Piece;
}) => {
  //  vertical
  const validVerticalCol = [currentLocation.col - 2, currentLocation.col + 2];
  const validVerticalRow = [
    cols[currentRowIndex - 1],
    cols[currentRowIndex + 1],
  ];
  for (let i = 0; i < validVerticalCol.length; i++) {
    for (let j = 0; j < validVerticalRow.length; j++) {
      const createdLocation = validVerticalRow[j] + validVerticalCol[i];

      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }
  }

  //  horizontal
  const validHorizontalCol = [currentLocation.col - 1, currentLocation.col + 1];
  const validHorizontalRow = [
    cols[currentRowIndex - 2],
    cols[currentRowIndex + 2],
  ];
  for (let i = 0; i < validHorizontalCol.length; i++) {
    for (let j = 0; j < validHorizontalRow.length; j++) {
      const createdLocation = validHorizontalRow[j] + validHorizontalCol[i];

      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }
  }
};

const movePieceKing = ({
  currentLocation,
  currentRowIndex,
  youCanMove,
  cols,
  type,
}: {
  currentLocation: { row: string; col: number };
  currentRowIndex: number;
  youCanMove: string[];
  cols: string[];
  type: Piece;
  
})=>{
  
  const validCol = [
    currentLocation.col + 1,
    currentLocation.col,
    currentLocation.col - 1,
  ];
  const validRow = [
    cols[currentRowIndex - 1],
    cols[currentRowIndex],
    cols[currentRowIndex + 1],
  ];

  for (let i = 0; i < validCol.length; i++) {
    for (let j = 0; j < validRow.length; j++) {
      const createdLocation = validRow[j] + validCol[i];

      type.initialPlace != createdLocation &&
        youCanMove.push(createdLocation);
    }
  }
}
const Player = ({
  type,
  setShowNextMove,
  pieceSelecteToMove,
  piecesPlayer,
  setPieceSelecteToMove,
  showNextMove,
  enemyPieces,
  isTurnOfPlayer,
}: {
  piecesPlayer: Piece[];
  type: Piece;
  setShowNextMove: any;
  pieceSelecteToMove: Piece | undefined;
  setPieceSelecteToMove: any;
  enemyPieces: Piece[];
  showNextMove: string[];
  isTurnOfPlayer: boolean;
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
    <section className="flex flex-col justify-center items-center ">
      <div
        className={`relative 
          ${isTurnOfPlayer === !type.isEnemy && !(isTurnOfPlayer === !type.isEnemy &&
            pieceSelecteToMove?.idPiece === type.idPiece) ? " border-yellow-500" : " border-transparent"}
          ${
            isTurnOfPlayer === !type.isEnemy &&
            pieceSelecteToMove?.idPiece === type.idPiece
              ? "bg-yellow-600"
              : ""
          }
          ${isEnemyInSport   && dataCamaradeOnly.includes(type.initialPlace) ? "bg-red-600" : ""}
          ${
            type.isEnemy ? " " : " "
          } z-90 m-auto w-[64px] h-[64px]  border-[4px]      hover:cursor-pointer flex justify-center items-center  font-normal text-sm  text-white `}
        onClick={() => {
          setShowNextMove(youCanMove);

          if (pieceSelecteToMove === undefined)
            type.isSelected = !type.isSelected;
          // pieceHasMove &&  ;

          setPieceSelecteToMove(type);
        }}
        id="refDate"
      >
        <img
          className={`w-full h-full  ${type?.isEnemy ? "invert" : ""}  `}
          src={`/${type.ficha}-removebg-preview.png`}
          alt=""
        />
      </div>
    </section>
  );
};

export default Player;
