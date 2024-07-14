import { useEffect, useState } from "react";

import "./App.css";

const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  ficha: string;
  initialPlace: string;
}

const fichasPlayer1 = [
  // { ficha: "peon", initialPlace: "a7" },
  // { ficha: "peon", initialPlace: "b7" },
  // { ficha: "peon", initialPlace: "c7" },
  // { ficha: "peon", initialPlace: "d7" },
  // { ficha: "peon", initialPlace: "e7" },
  // { ficha: "peon", initialPlace: "f7" },
  // { ficha: "peon", initialPlace: "g7" },
  // { ficha: "peon", initialPlace: "h7" },
  // { ficha: "torre", initialPlace: "a8" },
  // { ficha: "torre", initialPlace: "h8" },
  // { ficha: "caballo", initialPlace: "b8" },
  // { ficha: "caballo", initialPlace: "g8" },
  // { ficha: "alfil", initialPlace: "c8" },
  { ficha: "alfil", initialPlace: "f8" },
  // { ficha: "rey", initialPlace: "d8" },
  // { ficha: "reina", initialPlace: "e8" },
];

const fichasPlayer2 = [
  { ficha: "peon", initialPlace: "a2" },
  { ficha: "peon", initialPlace: "b2" },
  { ficha: "peon", initialPlace: "c2" },
  { ficha: "peon", initialPlace: "d2" },
  { ficha: "peon", initialPlace: "e2" },
  { ficha: "peon", initialPlace: "f2" },
  { ficha: "peon", initialPlace: "g2" },
  { ficha: "peon", initialPlace: "h2" },
  { ficha: "torre", initialPlace: "a1" },
  { ficha: "torre", initialPlace: "h1" },
  { ficha: "caballo", initialPlace: "b1" },
  { ficha: "caballo", initialPlace: "g1" },
  { ficha: "alfil", initialPlace: "c1" },
  { ficha: "alfil", initialPlace: "f1" },
  { ficha: "rey", initialPlace: "d1" },
  { ficha: "reina", initialPlace: "e1" },
];

// const aleatoryLocation = (): string => {
//   const result =
//     cols[Math.floor(Math.random() * cols.length)] +
//     Math.floor(Math.random() * cols.length + 1);

//   return result;
// };
// const allHearts = [aleatoryLocation(), aleatoryLocation(), aleatoryLocation()];

function App() {
  const [piecesPlayer1, setPiecesPlayer1] = useState<Piece[]>(fichasPlayer1);
  // const [piecesPlayer2, setPiecesPlayer2] = useState<Piece[]>(fichasPlayer2);
  const [pieceSelecteToMove, setPieceSelecteToMove] = useState<Piece>();

  const [showNextMove, setShowNextMove] = useState([]);

  const makeAMove = (newLocation: string) => {
    if (showNextMove.includes(newLocation)) {
      const oldPieces = piecesPlayer1.filter(
        (piece) => piece.initialPlace !== pieceSelecteToMove?.initialPlace
      );

      if (pieceSelecteToMove !== undefined) {
        const newPicesSet = [
          ...oldPieces,
          { ficha: pieceSelecteToMove?.ficha, initialPlace: newLocation },
        ];
       
        setPiecesPlayer1(newPicesSet);
      }

      setShowNextMove([]);
      setPieceSelecteToMove(undefined);
    }
  };

  return (
    <main>
      <section className="w-[800px] border  flex flex-col  mx-auto mt-20   relative  select-none">
        <div className="flex flex-row ">
          {cols.map((col) => (
            <div
              key={col + Math.random()}
              className="col w-16   justify-center items-center"
            >
              <p className="text-center">{col}</p>
            </div>
          ))}
        </div>
        <section className="flex">
          <div className="flex flex-col ">
            {cols.map((_, ind) => (
              <div key={ind} className="col h-16   justify-center items-center">
                <p className="text-center py-6">{ind + 1}</p>
              </div>
            ))}
          </div>

          <div className="border border-black">
            {cols.map((col, indexRow) => (
              <div className="row ">
                <div
                  key={col + Math.random()}
                  className="col flex border border-black"
                >
                  <div className="flex">
                    {cols.map((row, index) => {
                      const isBlack =
                        indexRow % 2 === 0 ? index % 2 === 0 : index % 2 !== 0;
                      const location = `${row + (indexRow + 1)}`;

                      return (
                        <div
                          key={location + " " + indexRow}
                          onMouseDown={() => {
                            makeAMove(location);
                          }}
                          className={` relative  w-16 h-16 border-black border `}
                        >
                          <div
                            key={
                              location +
                              Math.floor(Math.random() * indexRow + 9)
                            }
                            className={`${
                              isBlack
                                ? "bg-white text-black"
                                : "bg-black text-white"
                            } relative z-0 row w-16 h-16  flex justify-center items-center  `}
                          >
                            {location}
                          </div>

                          <div className="relative bottom-16 z-90">
                            <div>
                              {showNextMove.includes(location) && (
                                <div className="absolute w-16 h-16 bg-green-500/60"></div>
                              )}
                            </div>

                            {piecesPlayer1.map((piece) => {
                              return (
                                <div key={piece.initialPlace + " " + location}>
                                  {piece.initialPlace === location && (
                                    <Player
                                      type={piece}
                                      setShowNextMove={setShowNextMove}
                                      allPiecesPlayer={piecesPlayer1}
                                      setPiecesPlayer={setPiecesPlayer1}
                                      setPieceSelecteToMove={
                                        setPieceSelecteToMove
                                      }
                                      pieceSelecteToMove={pieceSelecteToMove}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;

const Player = ({
  type,
  setShowNextMove,

  allPiecesPlayer,
  setPieceSelecteToMove,
}: {
  allPiecesPlayer: Piece[];
  type: Piece;
  setShowNextMove: any;

  setPieceSelecteToMove: any;
}) => {
  const [showNextMoveView, setShowNextMoveView] = useState(false);

  const youCanMove: string[] = [];

  if (type.ficha === "peon") {
    const currentLocation = {
      row: type.initialPlace[0],
      col: Number(type.initialPlace[1]),
    };
    const currentRowIndex = cols.indexOf(currentLocation.row);

    const validCol = [
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
  }
  if (type.ficha === "caballo") {
    const currentLocation = {
      row: type.initialPlace[0],
      col: Number(type.initialPlace[1]),
    };
    const currentRowIndex = cols.indexOf(currentLocation.row);
    const validCol = [
      currentLocation.col - 2,
      currentLocation.col - 1,
      currentLocation.col + 1,
      currentLocation.col + 2,
    ];
    const validRow = [
      cols[currentRowIndex - 2],
      cols[currentRowIndex - 1],
      cols[currentRowIndex + 1],
      cols[currentRowIndex + 2],
    ];
    for (let i = 0; i < validCol.length; i++) {
      for (let j = 0; j < validRow.length; j++) {
        const createdLocation = validRow[j] + validCol[i];    

        type.initialPlace != createdLocation &&
          youCanMove.push(createdLocation);
      }
    }
  }
  if (type.ficha === "alfil") {
    const currentLocation = {
      row: type.initialPlace[0],
      col: Number(type.initialPlace[1]),
    };

    const currentRowIndex = cols.indexOf(currentLocation.row);
    const validCol = [
      
    ];

    for (let i = 0; i <  9; i++) {
      validCol.push(i);
    }

    
    
    
    const validRowLeftUp = [];
    const validRowLeftDown = [];
  


    for (let a =  1 ; a <  9; a++) {
   validRowLeftUp.push(cols[currentRowIndex - a]);

     }




     for (let a =  0 ; a <  9; a++) {
      
      
    
       validRowLeftDown.push(cols[currentRowIndex - a - 1]);

     }

     const validRowRightUp = [];
     const validRowRightDown = [];

     for (let a =  currentLocation.col ; a >  0; a--) {
      cols[currentRowIndex + a] && validRowRightUp.unshift(cols[currentRowIndex + a]);
  
    }
    for (let a =  9 ; a >  0; a--) {
      cols[currentRowIndex + a] && validRowRightDown.unshift(cols[currentRowIndex + a]);
   
    }



   // Left Up
    for (let i = 0; i < validRowLeftUp.length; i++) {
      const createdLocation = validRowLeftUp[i] + (currentLocation.col - (i + 1)) ;              
       type.initialPlace != createdLocation &&
         youCanMove.push(createdLocation);
      
    }

    // Left Down
    for (let i = 0; i < 9; i++) {
      const createdLocation = validRowLeftDown[i] + (currentLocation.col + (i + 1)) ;              
       type.initialPlace != createdLocation &&
         youCanMove.push(createdLocation);
      
    }
      // Right Up
  for (let i = 0; i < validRowRightUp.length; i++) {
    const createdLocation = validRowRightUp[i] + (currentLocation.col - (i + 1)) ;              
     type.initialPlace != createdLocation &&
       youCanMove.push(createdLocation);
    
  }

  // Right Down
  for (let i = 0; i < validRowRightDown.length; i++) {
    const createdLocation = validRowRightDown[i] + (currentLocation.col + (i + 1)) ;              
     type.initialPlace != createdLocation &&
       youCanMove.push(createdLocation);
    
  }





  console.log('youCanMove',validRowRightDown);
  


    
  }

  

  function uniqueElements(arr1: string[], arr2: string[]) {
    const uniqueInArr1 = arr1.filter((element) => !arr2.includes(element));
    const uniqueInArr2 = arr2.filter((element) => !arr1.includes(element));

    return [...uniqueInArr1, ...uniqueInArr2];
  }

  return (
    <section className="flex flex-col justify-center ">
      <div
        className={`relative ${
          showNextMoveView ? "bg-red-300" : "bg-blue-500"
        } z-40 m-auto w-[64px] h-[64px]  border-2  rounded-md   hover:cursor-pointer flex justify-center items-center  font-normal text-sm  text-white px-4`}
        onClick={() => {
          setShowNextMove(
            uniqueElements(
              youCanMove,
              allPiecesPlayer.map((piece) => piece.initialPlace)
            )
          );
          setShowNextMoveView(true);
          setPieceSelecteToMove(type);
        }}
        id="refDate"
      >
        {type.ficha}
      </div>
    </section>
  );
};
