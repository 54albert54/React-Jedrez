import { useState } from "react";

import "./App.css";
import Player from "./components/Player";
import { generateRandomString } from "./components/const";
import { cols, fichasPlayer1, fichasPlayer2, Piece } from "./components/data";
import { makeAMove } from "./components/moveFunct";

// const aleatoryLocation = (): string => {
//   const result =
//     cols[Math.floor(Math.random() * cols.length)] +
//     Math.floor(Math.random() * cols.length + 1);

//   return result;
// };
// const allHearts = [aleatoryLocation(), aleatoryLocation(), aleatoryLocation()];
const showPlayer = true;

function App() {
  const [piecesPlayer1, setPiecesPlayer1] = useState<Piece[]>(fichasPlayer1);
  const [piecesPlayer2, setPiecesPlayer2] = useState<Piece[]>(fichasPlayer2);
  const [pieceSelecteToMove, setPieceSelecteToMove] = useState<Piece>();
  const [pieceSelecteToMoveEnemy, setPieceSelecteToMoveEnemy] =
    useState<Piece>();
  const [isTurnOfPlayer, setIsTurnOfPlayer] = useState(true);

  const [showNextMove, setShowNextMove] = useState([]);
  const [showNextMoveEnemy, setShowNextMoveEnemy] = useState([]);

  return (
    <main>
      <section className="w-[800px] h-[265px]   flex flex-col  mx-auto mt-20   relative  select-none ">
        
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
        <section className="flex border border-black ">
          {/* <div className="flex flex-col ">
            {cols.map((_, ind) => (
              <div key={generateRandomString(8)} className="col h-16   justify-center items-center">
                <p className="text-center py-6">{ind + 1}</p>
              </div>
            ))}
          </div> */}

          <div className="">
            {cols.map((_, indexRow) => (
              <div key={generateRandomString(8)} className="row ">
                <div className="col flex ">
                  <div className="flex">
                    {cols.map((row, index) => {
                      const isBlack =
                        indexRow % 2 === 0 ? index % 2 === 0 : index % 2 !== 0;
                      const location = `${row + `${8 - indexRow}`}`;

                      return (
                        <div
                          key={generateRandomString(8)}
                          onMouseDown={() => {
                            makeAMove({
                              newLocation: location,
                              showNextMove: isTurnOfPlayer
                                ? showNextMove
                                : showNextMoveEnemy,
                              pieceSelecteToMove: isTurnOfPlayer
                                ? pieceSelecteToMove
                                : pieceSelecteToMoveEnemy,
                              piecesPlayer: isTurnOfPlayer
                                ? piecesPlayer1
                                : piecesPlayer2,
                              setPiecesPlayer: isTurnOfPlayer
                                ? setPiecesPlayer1
                                : setPiecesPlayer2,
                              setPieceSelecteToMove: isTurnOfPlayer
                                ? setPieceSelecteToMove
                                : setPieceSelecteToMoveEnemy,
                              setPieceSelecteToMoveEnemy: isTurnOfPlayer
                                ? setPieceSelecteToMoveEnemy
                                : setPieceSelecteToMove,
                              setShowNextMove: isTurnOfPlayer
                                ? setShowNextMove
                                : setShowNextMoveEnemy,
                              setIsTurnOfPlayer,
                              enemyPieces: isTurnOfPlayer
                                ? piecesPlayer2
                                : piecesPlayer1,
                              setEnemyPieces: isTurnOfPlayer
                                ? setPiecesPlayer2
                                : setPiecesPlayer1,
                              setClearNextMoveEnemy: isTurnOfPlayer
                                ? setShowNextMoveEnemy
                                : setShowNextMove,
                            });
                          }}
                          className={` relative  w-16 h-16  `}
                        >
                          <PaintBoard isBlack={isBlack} location={location} />

                          {showPlayer && (
                            <PlayerSide
                              showNextMove={showNextMove}
                              pieceSelecteToMove={pieceSelecteToMove}
                              location={location}
                              isEnemy={false}
                              isTurnOfPlayer={isTurnOfPlayer}
                              enemyPieces={
                                isTurnOfPlayer ? piecesPlayer2 : piecesPlayer1
                              }
                              piecesPlayer={piecesPlayer1}
                            >
                              {piecesPlayer1.map((piece) => {
                                piece.isEnemy = false;
                                return (
                                  <div key={generateRandomString(8)}>
                                    {piece.initialPlace === location && (
                                      <Player
                                        type={piece}
                                        isTurnOfPlayer={isTurnOfPlayer}
                                        setShowNextMove={setShowNextMove}
                                        piecesPlayer={piecesPlayer1}
                                        setPiecesPlayer={setPiecesPlayer1}
                                        setPieceSelecteToMove={
                                          setPieceSelecteToMove
                                        }
                                        pieceSelecteToMove={pieceSelecteToMove}
                                        showNextMove={
                                          isTurnOfPlayer
                                            ? showNextMove
                                            : showNextMoveEnemy
                                        }
                                        enemyPieces={
                                          isTurnOfPlayer
                                            ? piecesPlayer2
                                            : piecesPlayer1
                                        }
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </PlayerSide>
                          )}

                          {/* ------------------------------------------------------------------------------- */}
                          <PlayerSide
                            enemyPieces={
                              isTurnOfPlayer ? piecesPlayer2 : piecesPlayer1
                            }
                            showNextMove={showNextMoveEnemy}
                            pieceSelecteToMove={pieceSelecteToMoveEnemy}
                            location={location}
                            isEnemy={true}
                            isTurnOfPlayer={isTurnOfPlayer}
                            piecesPlayer={piecesPlayer2}
                          >
                            {piecesPlayer2.map((piece) => {
                              piece.isEnemy = true;
                              return (
                                <div key={generateRandomString(8)}>
                                  {piece.initialPlace === location && (
                                    <Player
                                      type={piece}
                                      isTurnOfPlayer={isTurnOfPlayer}
                                      setShowNextMove={setShowNextMoveEnemy}
                                      piecesPlayer={piecesPlayer2}
                                      setPiecesPlayer={setPiecesPlayer2}
                                      setPieceSelecteToMove={
                                        setPieceSelecteToMoveEnemy
                                      }
                                      pieceSelecteToMove={
                                        pieceSelecteToMoveEnemy
                                      }
                                      showNextMove={
                                        isTurnOfPlayer
                                          ? showNextMove
                                          : showNextMoveEnemy
                                      }
                                      enemyPieces={
                                        isTurnOfPlayer
                                          ? piecesPlayer2
                                          : piecesPlayer1
                                      }
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

          <section id="UI" className="w-full h-full bg-red-400 ">
          <div id="turn" className="bg-blue-l200  w-full h-5/6">d</div>
          <div className="bg-blue-100 w-full h-1/6 relative bottom-6 ">
          <p className="text-center">
            {" "}
            is Turn of {isTurnOfPlayer ? "Blancas" : "Negras"}
          </p>
          <div className="flex justify-around bg-red-900 h-full py-4 ">
          <p className={`
             ${isTurnOfPlayer ? "bg-emerald-100 text-emerald-700 border-emerald-700 w-28 h-12" : "bg-gray-100 text-gray-500 border-gray-800 w-28 h-10 border"} 
             inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 border  transition-all duration-200 ease-in-out
             `}>Blancas: {piecesPlayer1.length}</p>
          <p className="flex h-full justify-center items-center">{isTurnOfPlayer ? "<" : ">"}</p>
          <p
          className={`
            ${!isTurnOfPlayer ? "bg-emerald-100 text-emerald-700 border-emerald-700 w-28 h-12" : "bg-gray-100 text-gray-500 border-gray-800 w-28 h-10 border"} "}
            inline-flex items-center justify-center rounded-full    transition-all duration-200 ease-in-out
            `}
          >Negras: {piecesPlayer2.length}</p>
          </div>
          </div>
        </section>
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
        isBlack ? "bg-white text-black/60" : "bg-black text-white/60"
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
  isTurnOfPlayer,
  enemyPieces,
  piecesPlayer,
}: {
  children: React.ReactNode;
  showNextMove: any;
  pieceSelecteToMove: any;
  location: string;
  isEnemy: boolean;
  isTurnOfPlayer: boolean;
  enemyPieces: Piece[];
  piecesPlayer: Piece[];
}) => {
  const isEnemyInSport = enemyPieces.find(
    (piece) => piece.initialPlace === location
  );

  return (
    <div className="relative bottom-16 z-90">
      <div>
        {isTurnOfPlayer === !isEnemy &&
          showNextMove.includes(location) &&
          !piecesPlayer.map((piece) => piece.initialPlace).includes(location) &&
          pieceSelecteToMove !== undefined && (
            <div
              className={`absolute w-16 h-16 z-50  ${
                isEnemy
                  ? isEnemyInSport
                    ? ""
                    : "bg-red-500/30"
                  : isEnemyInSport
                  ? ""
                  : "bg-green-500/30"
              } `}
            ></div>
          )}
      </div>

      {children}
    </div>
  );
};

// UI


