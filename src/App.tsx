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
                              setIsTurnOfPlayer,
                              enemyPieces: isTurnOfPlayer ? piecesPlayer2 : piecesPlayer1,
                              setEnemyPieces: isTurnOfPlayer ? setPiecesPlayer2 : setPiecesPlayer1,

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
                              enemyPieces={isTurnOfPlayer ? piecesPlayer2 : piecesPlayer1}
                            >
                              {piecesPlayer1.map((piece) => {
                                piece.isEnemy = false;
                                return (
                                  <div key={generateRandomString(8)}>
                                    {piece.initialPlace === location && (
                                      <Player
                                        type={piece}
                                        setShowNextMove={setShowNextMove}
                                        piecesPlayer={piecesPlayer1}
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
                            enemyPieces={isTurnOfPlayer ? piecesPlayer2 : piecesPlayer1}
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
                                      piecesPlayer={piecesPlayer2}
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
  isTurnOfPlayer,
  enemyPieces
}: {
  children: React.ReactNode;
  showNextMove: any;
  pieceSelecteToMove: any;
  location: string;
  isEnemy: boolean;
  isTurnOfPlayer: boolean
  enemyPieces: Piece[]
}) => {

  const isEnemyInSport = enemyPieces.find(piece => piece.initialPlace === location)
  showNextMove.includes(location) && console.log('isEnemyInSport',isEnemyInSport);
  

  return (
    <div className="relative bottom-16 z-90">
      <div>
        { (isTurnOfPlayer === !isEnemy) &&
        showNextMove.includes(location) &&
          pieceSelecteToMove !== undefined && (
            <div
              className={`absolute w-16 h-16 z-50 -top-16 ${
                isEnemy ? isEnemyInSport ? "bg-red-500" : "bg-red-500/30" : isEnemyInSport ? "bg-green-500" : "bg-green-500/30"
              } `}
            ></div>
          )}
      </div>

      {children}
    </div>
  );
};
