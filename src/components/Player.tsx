import { useState } from "react";

import { cols, type Piece } from "./data";
import { uniqueElements } from "./const";

const Player = ({
  type,
  setShowNextMove,
  pieceSelecteToMove,
  piecesPlayer,
  setPieceSelecteToMove,
  showNextMove

}: {
  piecesPlayer: Piece[];
  type: Piece;
  setShowNextMove: any;
  pieceSelecteToMove: Piece | undefined;
  setPieceSelecteToMove: any;

  showNextMove: string[]
}) => {
  

  const isEnemyInSport = showNextMove.includes(type.initialPlace)
  
  let youCanMove: string[] = [];

  const currentLocation = {
    row: type.initialPlace[0],
    col: Number(type.initialPlace[1]),
  };
  const currentRowIndex = cols.indexOf(currentLocation.row);


  if (type.ficha === "peon") {
    const validCol = type.isEnemy ? [
      Number(type.initialPlace[1]) == 2 && currentLocation.col + 2,
      currentLocation.col + 1,
    ]  : [
      Number(type.initialPlace[1]) == 7 && currentLocation.col - 2,
      currentLocation.col - 1,
    ];
    const validRow = [cols[currentRowIndex]];

    for (let i = 0; i < validCol.length; i++) {
      for (let j = 0; j < validRow.length; j++) {
        const createdLocation = validRow[j] + validCol[i];

        type.initialPlace != createdLocation &&
          youCanMove.push(createdLocation);
      }
    }
  } else if (type.ficha === "caballo") {
    //  vertical
    const validVerticalCol = [
      currentLocation.col - 2,
      currentLocation.col + 2,
    ];
    const validVerticalRow = [

      cols[currentRowIndex - 1],
      cols[currentRowIndex + 1],
      
    ];
    for (let i = 0; i < validVerticalCol.length; i++) {
      for (let j = 0; j < validVerticalRow.length; j++) {
        const createdLocation = validVerticalRow[j] + validVerticalCol[i];

        type.initialPlace != createdLocation &&
          youCanMove.push(createdLocation);
      }
    }

    //  horizontal
    const validHorizontalCol = [
      currentLocation.col - 1,
      currentLocation.col + 1,
    ];
    const validHorizontalRow = [
      cols[currentRowIndex - 2],
      cols[currentRowIndex + 2],
    ];
    for (let i = 0; i < validHorizontalCol.length; i++) {
      for (let j = 0; j < validHorizontalRow.length; j++) {
        const createdLocation = validHorizontalRow[j] + validHorizontalCol[i];  

        type.initialPlace != createdLocation &&
          youCanMove.push(createdLocation);
      }
    }
  } else if (type.ficha === "alfil") {
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
      const createdLocation =
        validRowLeftUp[i] + (currentLocation.col - (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }

    // Left Down
    for (let i = 0; i < 9; i++) {
      const createdLocation =
        validRowLeftDown[i] + (currentLocation.col + (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }
    // Right Up
    for (let i = 0; i < validRowRightUp.length; i++) {
      const createdLocation =
        validRowRightUp[i] + (currentLocation.col - (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }

    // Right Down
    for (let i = 0; i < validRowRightDown.length; i++) {
      const createdLocation =
        validRowRightDown[i] + (currentLocation.col + (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }
  } else if (type.ficha === "rey") {
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
  } else if (type.ficha === "reina") {
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

    for (let i = 0; i < 9; i++) {
      //vertical Up - down
      youCanMove.push(currentLocation.row + (currentLocation.col - (i - 1)));
      youCanMove.push(currentLocation.row + (currentLocation.col + (i + 1)));

      // horizontal left - right
      youCanMove.push(cols[i] + currentLocation.col);
    }

    // Left Up
    for (let i = 0; i < validRowLeftUp.length; i++) {
      const createdLocation =
        validRowLeftUp[i] + (currentLocation.col - (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }

    // Left Down
    for (let i = 0; i < 9; i++) {
      const createdLocation =
        validRowLeftDown[i] + (currentLocation.col + (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }
    // Right Up
    for (let i = 0; i < validRowRightUp.length; i++) {
      const createdLocation =
        validRowRightUp[i] + (currentLocation.col - (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }

    // Right Down
    for (let i = 0; i < validRowRightDown.length; i++) {
      const createdLocation =
        validRowRightDown[i] + (currentLocation.col + (i + 1));
      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }
  } else if (type.ficha === "torre") {
    for (let i = 0; i < 9; i++) {
      //vertical Up - down
      youCanMove.push(currentLocation.row + (currentLocation.col - (i - 1)));
      youCanMove.push(currentLocation.row + (currentLocation.col + (i + 1)));

      // horizontal left - right
      youCanMove.push(cols[i] + currentLocation.col);
      //  youCanMove.push(cols[currentRowIndex + 1]   + currentLocation.col )
    }
  } else {
    youCanMove = [];
  }

  return (
    <section className="flex flex-col justify-center ">
      <div
        className={`relative 
          ${isEnemyInSport && "bg-red-600"}
          ${
          type.isEnemy ? " border-red-300" : " border-b"
        } z-90 m-auto w-[64px] h-[64px]  border-2  rounded-md   hover:cursor-pointer flex justify-center items-center  font-normal text-sm  text-white `}
        onClick={() => {
          setShowNextMove(
            uniqueElements(
              youCanMove,
              piecesPlayer.map((piece) => piece.initialPlace)
            )
          );
        
          if (pieceSelecteToMove === undefined)
            type.isSelected = !type.isSelected;
          // pieceHasMove &&  ;

          setPieceSelecteToMove(type);
        }}
        id="refDate"
      >
        
        <img className={`w-full h-full  ${type?.isEnemy ? "invert" : ""}  `} src={`/${type.ficha}-removebg-preview.png`} alt="" />
      </div>
    </section>
  );
};

export default Player;
