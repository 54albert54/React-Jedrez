import { useState } from "react";

import "./App.css";
import Player from "./components/Player";
import { generateRandomString } from "./components/const";
import { cols, fichasPlayer1, fichasPlayer2, Piece } from "./components/data";

// const aleatoryLocation = (): string => {
//   const result =
//     cols[Math.floor(Math.random() * cols.length)] +
//     Math.floor(Math.random() * cols.length + 1);

//   return result;
// };
// const allHearts = [aleatoryLocation(), aleatoryLocation(), aleatoryLocation()];
const showPlayer = true;

const makeAMove = ({
  newLocation,
  showNextMove,
  pieceSelecteToMove,
  piecesPlayer,
  setPiecesPlayer,
  setPieceSelecteToMove,
  setShowNextMove,
  setIsTurnOfPlayer
}: {
  newLocation: string;
  showNextMove: string[];
  pieceSelecteToMove: Piece | undefined;
  piecesPlayer: Piece[];
  setPiecesPlayer: any;
  setPieceSelecteToMove: any;
  setShowNextMove: any;
  setIsTurnOfPlayer: any
}) => {
  
  if (showNextMove.includes(newLocation)) {
    
  
    const oldPieces = piecesPlayer.filter(
      (piece) => piece.initialPlace !== pieceSelecteToMove?.initialPlace
    );

    console.log('showNextMove',pieceSelecteToMove);

    if (
      pieceSelecteToMove !== undefined &&
      pieceSelecteToMove?.isSelected === true
    ) {
      // console.log('makeAMove',showNextMove);
      const spotIsFree = oldPieces.map((piece) => piece.initialPlace).includes(newLocation);
      
      
      if (!spotIsFree) {
        const newPicesSet = [
          ...oldPieces,
          { ficha: pieceSelecteToMove?.ficha, initialPlace: newLocation },
        ];
        setIsTurnOfPlayer(state => !state);
        setPiecesPlayer(newPicesSet);
      } else {
        console.log("is noo free");
      }
    }

    setShowNextMove([]);
    setPieceSelecteToMove(undefined);
  }
};
function App() {
  const [piecesPlayer1, setPiecesPlayer1] = useState<Piece[]>(fichasPlayer1);
  const [piecesPlayer2, setPiecesPlayer2] = useState<Piece[]>(fichasPlayer2);
  const [pieceSelecteToMove, setPieceSelecteToMove] = useState<Piece>();
  const [isTurnOfPlayer, setIsTurnOfPlayer] = useState(true); 
  const [pieceSelecteToMoveEnemy, setPieceSelecteToMoveEnemy] =useState<Piece>();

  const [showNextMove, setShowNextMove] = useState([]);
  const [showNextMoveEnemy, setShowNextMoveEnemy] = useState([]);

  return (
    <main>
      <section className="w-[800px] border  flex flex-col  mx-auto mt-20   relative  select-none">
        <p className="text-center"> is Turn of {isTurnOfPlayer ? "player1" : "player2"}</p>
        {/* <div className="flex flex-row ">
          {cols.map((col) => (
            <div
              key={generateRandomString(8)}
              className="col w-16   justify-center items-center"
            >
              <p className="text-center">{col}</p>
            </div>
          ))}
        </div> */}
        <section className="flex">
          {/* <div className="flex flex-col ">
            {cols.map((_, ind) => (
              <div key={generateRandomString(8)} className="col h-16   justify-center items-center">
                <p className="text-center py-6">{ind + 1}</p>
              </div>
            ))}
          </div> */}

          <div className="border border-black">
            {cols.map((_, indexRow) => (
              <div key={generateRandomString(8)} className="row ">
                <div className="col flex border border-black">
                  <div className="flex">
                    {cols.map((row, index) => {
                      const isBlack =
                        indexRow % 2 === 0 ? index % 2 === 0 : index % 2 !== 0;
                      const location = `${row + (indexRow + 1)}`;

                      return (
                        <div
                          key={generateRandomString(8)}
                          onMouseDown={() => {
                            makeAMove({
                              newLocation: location,
                              showNextMove: isTurnOfPlayer ? showNextMove : showNextMoveEnemy,
                              pieceSelecteToMove: isTurnOfPlayer ? pieceSelecteToMove : pieceSelecteToMoveEnemy,
                              piecesPlayer: isTurnOfPlayer ? piecesPlayer1 : piecesPlayer2,
                              setPiecesPlayer : isTurnOfPlayer ? setPiecesPlayer1 : setPiecesPlayer2,
                              setPieceSelecteToMove : isTurnOfPlayer ? setPieceSelecteToMove : setPieceSelecteToMoveEnemy,
                              setShowNextMove : isTurnOfPlayer ? setShowNextMove : setShowNextMoveEnemy,
                              setIsTurnOfPlayer
                            });
                          }}
                          className={` relative  w-16 h-16 border-black border `}
                        >
                          <PaintBoard isBlack={isBlack} location={location} />

                          {showPlayer && (
                            <PlayerSide
                              showNextMove={showNextMove}
                              pieceSelecteToMove={pieceSelecteToMove}
                              location={location}
                              isEnemy={false}
                              isTurnOfPlayer={isTurnOfPlayer}
                            >
                              {piecesPlayer1.map((piece) => {
                                piece.isEnemy = false;
                                return (
                                  <div key={generateRandomString(8)}>
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
                            </PlayerSide>
                          )}

                          {/* ------------------------------------------------------------------------------- */}
                          <PlayerSide
                            showNextMove={showNextMoveEnemy}
                            pieceSelecteToMove={pieceSelecteToMoveEnemy}
                            location={location}
                            isEnemy={true}
                            isTurnOfPlayer={isTurnOfPlayer}
                          >
                            {piecesPlayer2.map((piece) => {
                              piece.isEnemy = true;
                              return (
                                <div key={generateRandomString(8)}>
                                  {piece.initialPlace === location && (
                                    <Player
                                      type={piece}
                                      setShowNextMove={setShowNextMoveEnemy}
                                      allPiecesPlayer={piecesPlayer2}
                                      setPiecesPlayer={setPiecesPlayer2}
                                      setPieceSelecteToMove={
                                        setPieceSelecteToMoveEnemy
                                      }
                                      pieceSelecteToMove={pieceSelecteToMoveEnemy}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </PlayerSide>
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

const PaintBoard = ({
  isBlack,
  location,
}: {
  isBlack: boolean;
  location: string;
}) => {
  return (
    <div
      key={generateRandomString(8)}
      className={`${
        isBlack ? "bg-white text-black" : "bg-black text-white"
      } relative z-0 row w-16 h-16  flex justify-center items-center  `}
    >
      {location}
    </div>
  );
};

const PlayerSide = ({
  children,
  showNextMove,
  pieceSelecteToMove,
  location,
  isEnemy,
  isTurnOfPlayer
}: {
  children: React.ReactNode;
  showNextMove: any;
  pieceSelecteToMove: any;
  location: string;
  isEnemy: boolean;
  isTurnOfPlayer: boolean
}) => {
  return (
    <div className="relative bottom-16 z-90">
      <div>
        { (isTurnOfPlayer === !isEnemy) &&
        showNextMove.includes(location) &&
          pieceSelecteToMove !== undefined && (
            <div
              className={`absolute w-16 h-16 ${
                isEnemy ? "bg-red-500/60" : "bg-green-500/60"
              } `}
            ></div>
          )}
      </div>

      {children}
    </div>
  );
};
