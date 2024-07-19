import { useEffect, useState } from "react";

import "./App.css";
import Player from "./components/Player";
import { generateRandomString } from "./components/const";
import {
  cols,
  fichasPlayer1,
  fichasPlayer2,
  HistoryMove,
  Piece,
} from "./components/data";
import { makeAMove } from "./components/moveFunct";
import Summary from "./components/UI/Summary";
import UCIBoard from "./components/UI/UCIBoard.tsx";
import useChessBoard from "./components/chessIA/index.ts";
import ChangePeonWindow from "./components/UI/ChangePeonWindow.tsx";









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
  const [isTurnOfPlayer,  setIsTurnOfPlayer   ] = useState(true);

  const [showNextMove, setShowNextMove] = useState<string[]>([]);
  const [showNextMoveEnemy, setShowNextMoveEnemy] = useState<string[]>([]);

  const [startGame, setStartGame] = useState(false);



  const [showAlert, setShowAlert] = useState(true);
  const [peonIsGoal, setPeonIsGoal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isFinshedGame, setIsFinshedGame] = useState(false);

  const [playHistory, setPlayHistory] = useState<HistoryMove[]>([]);
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [playerVSPlayer, setPlayerVSPlayer] = useState(true);
  const [lastPieceMovedIA, setLastPieceMovedIA] = useState('');

  const [peonInGolLocation, setPeonInGolLocation] = useState('');

  const  {
    allMove,
    showBoard, 
    makeUserMove,
    IAMakeMove,
    kingIsInHake,
    } = useChessBoard()


    const resetAlert = () => {
      setShowAlert(false)
      setPeonIsGoal(false)
      setIsTurnOfPlayer(state => !state)
    }

    useEffect(() => {
      if (allMove.length == 0){
        setIsCheckMate(true)
        setShowAlert(true)
        }


    }, [piecesPlayer1 ,piecesPlayer2])
    
    useEffect(() => {
      
      
      if ((!playerVSPlayer && !isTurnOfPlayer) && allMove.length > 0) {
        setShowAlert(true);
        const result = IAMakeMove()
        console.log('result',result);
        
      
  

        if (result.moveIsKill){
          const piecePlayerToRemove = piecesPlayer1.filter(piece => piece.initialPlace !== result.to)
          
          
          setPiecesPlayer1(piecePlayerToRemove)

        }
          
          
         const  seletedEnemyPiece : Piece | undefined = piecesPlayer2.find(piece => piece.initialPlace === result.from)
          // setShowNextMoveEnemy([result])
        


       

        console.log('enemmychoose',seletedEnemyPiece);
        setLastPieceMovedIA(seletedEnemyPiece?.idPiece || '')
        setPieceSelecteToMoveEnemy(seletedEnemyPiece)
          
      const ollEnemyPiece = piecesPlayer2.filter(piece => piece.idPiece !== seletedEnemyPiece?.idPiece )

      const updatedEnemyPieces = [...ollEnemyPiece,{... seletedEnemyPiece,initialPlace:result.to}]
      setPiecesPlayer2(updatedEnemyPieces as Piece[])
      setIsTurnOfPlayer(true);   
      setShowAlert(false);  
  
        
    }
    
    }, [isTurnOfPlayer, piecesPlayer2])

  const kingWasDeath = () => {
    setIsFinshedGame(true);
    setShowAlert(true);
  };
  const saveInHistory = ({ newLocation, owner, piece }: HistoryMove) => {
    const move = { newLocation, owner, piece };
    setPlayHistory((prev) => [...prev, move]);
  };
  useEffect(() => {
    if(kingIsInHake){
      
      if (isTurnOfPlayer) {
        const searchToKing = piecesPlayer1.find(piece => piece.ficha === 'rey')
        setPieceSelecteToMove(searchToKing);
      }else{
        const searchToKing = piecesPlayer2.find(piece => piece.ficha === 'rey')
        setPieceSelecteToMoveEnemy(searchToKing);
      }
    }
   

  }, [kingIsInHake]);

  return (
    <main>
      {
        kingIsInHake && <p className=" text-center font-semibold text-4xl ">Juego terminado</p>
      }
      <UCIBoard {...{ showBoard }} />
      <section className=" w-screen max-w-[514px] h-full   flex flex-col  mx-auto mt-20    relative  select-none ">
        <CoverBoard showAlert={showAlert}>
          {peonIsGoal && (
            <ChangePeonWindow
              {...{
                piece:isTurnOfPlayer?  pieceSelecteToMove  :  pieceSelecteToMoveEnemy,
                resetAlert,
                savePices: isTurnOfPlayer
                  ? setPiecesPlayer1
                  : setPiecesPlayer2,
                setChangeTurn: setIsTurnOfPlayer,
                makeUserMove,
                peonInGolLocation
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
            />
          )}
          {isFinshedGame && <TheKingIsFallen {... {isCheckMate}} />}
          {isCheckMate &&  <TheKingIsFallen {... {isCheckMate}} />}
          {!startGame && <StartWindow {...{ setStartGame, setShowAlert ,setPlayerVSPlayer }} />}
        </CoverBoard>

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
        <section className="flex flex-col sm:flex-row border border-black ">
          {/* <div className="flex flex-col ">
            {cols.map((_, ind) => (
              <div key={generateRandomString(8)} className="col h-16   justify-center items-center">
                <p className="text-center py-6">{ind + 1}</p>
              </div>
            ))}
          </div> */}

          <div className="">
            {cols.map((_, indexRow) => (
              <div key={generateRandomString(8)} id={`row${8 - indexRow }`} className="row flex">
               
                  
                    {cols.map((row, index) => {
                      const isBlack =
                        indexRow % 2 === 0 ? index % 2 === 0 : index % 2 !== 0;
                      const location = `${row + `${8 - indexRow}`}`;

                      return (
                        <div
                        id={location}
                          key={generateRandomString(8)}
                          onMouseDown={() => {
                           ( playerVSPlayer ) &&  makeAMove({
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
                              setPeonIsGoal ,
                              setPeonInGolLocation

                            });
                            ( !playerVSPlayer &&  isTurnOfPlayer ) &&    makeAMove({
                              newLocation: location,
                              showNextMove: showNextMove,
                              pieceSelecteToMove: pieceSelecteToMove,
                              piecesPlayer: piecesPlayer1,
                              setPiecesPlayer: setPiecesPlayer1,
                              setPieceSelecteToMove: setPieceSelecteToMove,
                              setPieceSelecteToMoveEnemy: setPieceSelecteToMoveEnemy,
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
                              setPeonIsGoal ,
                              setPeonInGolLocation
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
                                        setShowAlert={setShowAlert}
                                        setPeonIsGoal={setPeonIsGoal}
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
                                <div id={piece.ficha +"-"+ (piece.isEnemy ? "black" : "white")} key={generateRandomString(8)}>
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
                                      setShowAlert={setShowAlert}
                                      setPeonIsGoal={setPeonIsGoal}
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

const TheKingIsFallen = ({isCheckMate}: {isCheckMate?: boolean}) => {
  return (
    <section
      className="absolute z-50 w-[250px] h-[250px] bg-slate-200 shadow-inner translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md  pt-4 "
      onClick={() => {
        window.location.reload();
      }}
    >
      <div className="flex justify-center my-4 ">
        <p className=" text-center font-semibold text-xl ">{isCheckMate ? "Hake Mate" : 'Juego terminado'}</p>
      </div>
    </section>
  );
};

const CoverBoard = ({
  showAlert,
  children,
}: {
  showAlert: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      {showAlert && (
        <section className="absolute z-50 w-full h-full bg-black/40  rounded-md shadow-2xl ">
          {children}
        </section>
      )}
    </>
  );
};

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
      } relative z-0 row w-[54px] h-[54px]   sm:w-16 sm:h-16   flex justify-center items-center  `}
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
  
  //
  

  return (
    <div id={!isEnemy ? "white side" : "black side"}  className={` relative bottom-16 z-90  `} >
     
        {isTurnOfPlayer === !isEnemy &&
          showNextMove.includes(location) &&
          !piecesPlayer.map((piece) => piece.initialPlace).includes(location) &&
          pieceSelecteToMove !== undefined && (
            <div
              className={`
                
                absolute top-[10px]   sm:top-0 w-[54px] h-[54px] sm:w-16 sm:h-16  z-20  ${
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
     

      {children}
    </div>
  );
};

// UI

const StartWindow =({ setStartGame, setShowAlert ,setPlayerVSPlayer}:{setStartGame:Function, setShowAlert:Function , setPlayerVSPlayer:Function}) =>{
  return(
    <section className="absolute z-50 w-[250px] h-[250px] bg-slate-200 shadow-inner translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md  pt-4 ">
      <p className=" text-center font-semibold text-xl ">Elige Modo Juego</p>

      <ul>

       
        <li
        onClick={() => {setStartGame(true);setShowAlert(false) ; setPlayerVSPlayer(true) }}
        className="flex justify-center items-center cursor-pointer my-4  bg-white w-32 mx-auto rounded-full border   border-emerald-500 px-2.5 py-0.5 text-emerald-700 active:bg-emerald-400 active:text-teal-50 hover:bg-emerald-300 shadow-md"
          
        >
          <p>PVE</p>
        </li>

        <li
        onClick={() => {setStartGame(true);setShowAlert(false) ; setPlayerVSPlayer(false) }}
        className="flex justify-center items-center cursor-pointer my-4  bg-white w-32 mx-auto rounded-full border   border-emerald-500 px-2.5 py-0.5 text-emerald-700 active:bg-emerald-400 active:text-teal-50 hover:bg-emerald-300 shadow-md"
          
        >
          <p>PVC</p>
        </li>

        <li>
          <div className="flex items-center justify-center flex-col ">
            <p>Dificultad</p>
            <div>
            {
              [1,2,3].map((dificulty) => (
                <button key={dificulty}
                className="w-10 mt-2 mx-4 bg-white rounded-full border   border-blue-500 px-2.5 py-0.5 text-blue-700 active:bg-blue-400 active:text-teal-50 hover:bg-blue-300 shadow-md">{dificulty}</button>
              ))
            }
            </div>
          </div>
        </li>

      </ul>
    </section>
  )
}


