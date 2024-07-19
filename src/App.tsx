import { useEffect, useState } from "react";

import "./App.css";
import Player from "./components/Player";
import { generateRandomString } from "./components/const";
import { cols, fichasPlayer1, fichasPlayer2, Piece } from "./components/data";
import { makeAMove } from "./components/moveFunct";
import Summary from "./components/UI/Summary";

import ChangePeonWindow from "./components/UI/ChangePeonWindow.tsx";
import UCIBoard from "./components/UI/UCIBoard.tsx";
import useGameContext from "./context/index.tsx";
import StartWindow from "./components/UI/StartWindow.tsx";
import PlayerSide from "./components/UI/PlayerSide.tsx";
import PaintBoard from "./components/UI/PaintBoard.tsx";
import CoverBoard from "./components/UI/CoverBoard.tsx";
import TheKingIsFallen from "./components/UI/TheKingIsFallen.tsx";

const showPlayer = true;

function App() {
  const [piecesPlayer1, setPiecesPlayer1] = useState<Piece[]>(fichasPlayer1);
  const [piecesPlayer2, setPiecesPlayer2] = useState<Piece[]>(fichasPlayer2);
  const [pieceSelecteToMove, setPieceSelecteToMove] = useState<Piece>();
  const [pieceSelecteToMoveEnemy, setPieceSelecteToMoveEnemy] =
    useState<Piece>();
  const [isTurnOfPlayer, setIsTurnOfPlayer] = useState(true);

  const [showNextMove, setShowNextMove] = useState<string[]>([]);
  const [showNextMoveEnemy, setShowNextMoveEnemy] = useState<string[]>([]);

  const [showAlert, setShowAlert] = useState(true);
  const [peonIsGoal, setPeonIsGoal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isFinshedGame, setIsFinshedGame] = useState(false);

  const [isCheckMate, setIsCheckMate] = useState(false);
  const [playerVSPlayer, setPlayerVSPlayer] = useState(true);

  const [peonInGolLocation, setPeonInGolLocation] = useState("");
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const {
    startGame,
    setStartGame,
    playHistory,
    saveInHistory,
    lastPieceMovedIA,
    setLastPieceMovedIA,
    allmoves,
    makeUserMove,
    IAMakeMove,
    kingIsInHake,
    showBoard,
  } = useGameContext();

  const [showAllMoves, setShowAllMoves] = useState(false);

  const [showReumen , setShowReumen] = useState(false);

  const resetAlert = () => {
    setShowAlert(false);
    setPeonIsGoal(false);
    setIsTurnOfPlayer((state) => !state);
  };

  useEffect(() => {
    if (allmoves.length == 0) {
      setIsCheckMate(true);
      setShowAlert(true);
    }
  }, [piecesPlayer1, piecesPlayer2]);

  useEffect(() => {
    if (!playerVSPlayer && !isTurnOfPlayer && allmoves.length > 0) {
      setShowAlert(true);
      const result = IAMakeMove();

      if (result.moveIsKill) {
        const piecePlayerToRemove = piecesPlayer1.filter(
          (piece) => piece.initialPlace !== result.to
        );

        setPiecesPlayer1(piecePlayerToRemove);
      }

      const seletedEnemyPiece: Piece | undefined = piecesPlayer2.find(
        (piece) => piece.initialPlace === result.from
      );
      // setShowNextMoveEnemy([result])

      setLastPieceMovedIA(seletedEnemyPiece?.idPiece || "");
      setPieceSelecteToMoveEnemy(seletedEnemyPiece);

      const ollEnemyPiece = piecesPlayer2.filter(
        (piece) => piece.idPiece !== seletedEnemyPiece?.idPiece
      );

      const updatedEnemyPieces = [
        ...ollEnemyPiece,
        { ...seletedEnemyPiece, initialPlace: result.to },
      ];
      setPiecesPlayer2(updatedEnemyPieces as Piece[]);
      setIsTurnOfPlayer(true);
      setShowAlert(false);
      saveInHistory(result.moveSaved);
    }
  }, [isTurnOfPlayer, piecesPlayer2]);

  const kingWasDeath = () => {
    setIsFinshedGame(true);
    setShowAlert(true);
  };

  useEffect(() => {
    if (kingIsInHake) {
      if (isTurnOfPlayer) {
        const searchToKing = piecesPlayer1.find(
          (piece) => piece.ficha === "rey"
        );
        setPieceSelecteToMove(searchToKing);
      } else {
        const searchToKing = piecesPlayer2.find(
          (piece) => piece.ficha === "rey"
        );
        setPieceSelecteToMoveEnemy(searchToKing);
      }
    }
  }, [kingIsInHake]);

  const showAllPices = (fichas: Piece[], title: string) => {
    const dataPices: Record<string, number> = {
      peon: 0,
      torre: 0,
      caballo: 0,
      alfil: 0,
      rey: 0,
      reina: 0,
    };

    for (let i = 0; i < fichas.length; i++) {
      const piece = fichas[i];
      dataPices[piece.ficha] += 1;
    }

    return (
      <div className="w-full flex flex-col h-16 justify-center  gap-3 my-2">
        <p
          className={` ${
            title !== "Black" ? "text-black bg-slate-100" : "text-white bg-black"
          } w-32 mx-auto border border-black p-1 rounded-lg shadow-lg `}
        >
          {title}
        </p>

        <div className="w-full flex justify-center  gap-3 px-4">
          <p>reina: <span className={`${dataPices.reina <= 0 ? "text-red-500" : ""}`}>{dataPices.reina}</span></p>
          <p>alfil: <span className={`${dataPices.alfil <= 0 ? "text-red-500" : ""}`}>{dataPices.alfil}</span></p>
          <p>caballo: <span className={`${dataPices.caballo <= 0 ? "text-red-500" : ""}`}>{dataPices.caballo}</span></p>
          <p>torre: <span className={`${dataPices.torre <= 0 ? "text-red-500" : ""}`}>{dataPices.torre}</span></p>
          <p>peon: <span className={`${dataPices.peon <= 0 ? "text-red-500" : ""}`}>{dataPices.peon}</span></p>
          
        </div>
      </div>
    );
  };

  return (
    <main>
      <section className=" w-screen max-w-[514px] h-full   flex flex-col  mx-auto mt-20    relative  select-none ">
        <div className="w-full flex justify-center h-5">
          {playHistory.length > 0 && (
            <p>Last move {playHistory[playHistory.length - 1]}</p>
          )}
        </div>

        <CoverBoard showAlert={showAlert}>
          {peonIsGoal && (
            <ChangePeonWindow
              {...{
                piece: isTurnOfPlayer
                  ? (pieceSelecteToMove as Piece)
                  : (pieceSelecteToMoveEnemy as Piece),
                resetAlert,
                savePices: isTurnOfPlayer ? setPiecesPlayer1 : setPiecesPlayer2,
                setChangeTurn: setIsTurnOfPlayer,
                makeUserMove,
                peonInGolLocation,
              }}
            />
          )}
          {showSummary && (
            <Summary
              {...{
                isTurnOfPlayer,
                piecesPlayer1,
                piecesPlayer2,
                setShowSummary,
                setShowAlert,
                playHistory,
              }}
            >
              <UCIBoard {...{ showBoard }} />
            </Summary>
          )}
          {isFinshedGame && <TheKingIsFallen {...{ isCheckMate }} />}
          {isCheckMate && <TheKingIsFallen {...{ isCheckMate }} />}
          {!startGame && (
            <StartWindow
              {...{ setStartGame, setShowAlert, setPlayerVSPlayer }}
            />
          )}
          {showAllMoves && (
        <div className="flex-wrap px-20 sm:px-40 mt-4 flex justify-center gap-3 border-slate-950 w-full text-center text-[12px]">
          
          
         <div className="flex-wrap text-ellipsis min-h-[150px]  flex justify-center gap-3 border-slate-950 py-2 px-6  bg-red-100 rounded-lg  text-sm shadow-sm border-2">
          {allmoves.map((move, index) => {
            return <p key={index}>{move}</p>;
          })}
          </div>

         
          <div className="w-full flex flex-col justify-center gap-3">
          <div 
          onClick={() => {setShowReumen(!showReumen) ,setShowMoreInfo(false)}}
          className="bg-gray-300 rounded-lg shadow-sm border-dotted border-2 flex flex-col py-4 transition-all">
            {showReumen ? (
              <>
              {showAllPices(piecesPlayer2, "Black")}
            {showAllPices(piecesPlayer1, "White")}
            </>
            ):(<p> Resumen </p>)}
          </div>
          <div 
          onClick={() => {setShowMoreInfo(!showMoreInfo) ,setShowReumen(false)}}
          className="bg-blue-300 rounded-lg shadow-sm border-dotted border-2 py-4 transition-all ">
            {
              showMoreInfo ? (
                <div className="pl-3 text-left">
                <p className="">N: caballo R: torre B: alfil Q: reina R: rey</p>
                <p>si termina en '+' es hake</p>
                <p>si termina en '#' es mate</p>
                <p>posicion inicial 'x' pocion final es comer una piesa </p>
                <p>h8=Q peon por reina etc</p>
                </div>
                ):( <p> Reglas </p>)
            }
          </div>
          </div>

        </div>
      )}
        </CoverBoard>

        <section className="flex flex- sm:flex-row border border-black ">
          <div className="">
            {cols.map((_, indexRow) => (
              <div
                key={generateRandomString(8)}
                id={`row${8 - indexRow}`}
                className="row flex"
              >
                {cols.map((row, index) => {
                  const isBlack =
                    indexRow % 2 === 0 ? index % 2 === 0 : index % 2 !== 0;
                  const location = `${row + `${8 - indexRow}`}`;

                  return (
                    <div
                      id={location}
                      key={generateRandomString(8)}
                      onMouseDown={() => {
                        playerVSPlayer &&
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
                            saveInHistory,
                            kingWasDeath,
                            makeUserMove,
                            playerVSPlayer,
                            setShowAlert,
                            setPeonIsGoal,
                            setPeonInGolLocation,
                            allmoves,
                          });
                        !playerVSPlayer &&
                          isTurnOfPlayer &&
                          makeAMove({
                            newLocation: location,
                            showNextMove: showNextMove,
                            pieceSelecteToMove: pieceSelecteToMove,
                            piecesPlayer: piecesPlayer1,
                            setPiecesPlayer: setPiecesPlayer1,
                            setPieceSelecteToMove: setPieceSelecteToMove,
                            setPieceSelecteToMoveEnemy:
                              setPieceSelecteToMoveEnemy,
                            setShowNextMove: setShowNextMove,
                            setIsTurnOfPlayer: setIsTurnOfPlayer,
                            enemyPieces: piecesPlayer2,
                            setEnemyPieces: setPiecesPlayer2,
                            setClearNextMoveEnemy: setShowNextMoveEnemy,
                            saveInHistory: saveInHistory,
                            kingWasDeath: kingWasDeath,
                            makeUserMove: makeUserMove,
                            playerVSPlayer: playerVSPlayer,
                            setShowAlert,
                            setPeonIsGoal,
                            setPeonInGolLocation,
                            allmoves,
                          });
                      }}
                      className={` relative w-[54px] h-[54px]   sm:w-16 sm:h-16  `}
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
                            if (piece.initialPlace !== location) return null;
                            return (
                              <div key={generateRandomString(8)}>
                                {piece.initialPlace === location && (
                                  <Player
                                    type={piece}
                                    isTurnOfPlayer={isTurnOfPlayer}
                                    setShowNextMove={setShowNextMove}
                                    piecesPlayer={piecesPlayer1}
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
                          if (piece.initialPlace !== location) return null;
                          return (
                            <div
                              id={
                                piece.ficha +
                                "-" +
                                (piece.isEnemy ? "black" : "white")
                              }
                              key={generateRandomString(8)}
                            >
                              {piece.initialPlace === location && (
                                <Player
                                  type={piece}
                                  isTurnOfPlayer={isTurnOfPlayer}
                                  setShowNextMove={setShowNextMoveEnemy}
                                  piecesPlayer={piecesPlayer2}
                                  setPieceSelecteToMove={
                                    setPieceSelecteToMoveEnemy
                                  }
                                  pieceSelecteToMove={pieceSelecteToMoveEnemy}
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
                                  lastPieceMovedIA={lastPieceMovedIA}
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
            ))}
          </div>
        </section>
      </section>
      
      <div className="flex justify-center mt-9 ">
        <button
          className="bg-blue-500  mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {setShowAllMoves((state) => (state ? false : true)) , setShowAlert((state) => (state ? false : true))}}
        >
          Movimientos
        </button>

        <button
          className={`  ${
            showSummary
              ? "bg-green-500 hover:bg-green-700"
              : "bg-red-500 hover:bg-red-700"
          }      text-white font-bold py-2 px-4 rounded`}
          onClick={() => {
            setShowSummary((state) => (state ? false : true)),
              setShowAlert((state) => (state ? false : true));
          }}
        >
          {" "}
          {showSummary ? "Reanudar" : "Pausa"}
        </button>
      </div>
    </main>
  );
}

export default App;
