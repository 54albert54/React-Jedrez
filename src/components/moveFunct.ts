import { piecesToUci } from "./chessIA";
import { HistoryMove, Piece } from "./data";
import { Dispatch, SetStateAction } from 'react';


export const makeAMove = ({
  newLocation,
  showNextMove,
  pieceSelecteToMove,
  piecesPlayer,
  setPiecesPlayer,
  setPieceSelecteToMove,
  setShowNextMove,
  setIsTurnOfPlayer,
  enemyPieces,
  setEnemyPieces,
  setPieceSelecteToMoveEnemy,
  setClearNextMoveEnemy,
  saveInHistory,
  kingWasDeath,
  makeUserMove,
 
  setShowAlert,
  setPeonIsGoal,
  setPeonInGolLocation
}: {
  newLocation: string;
  showNextMove: string[];
  pieceSelecteToMove: Piece | undefined;
  piecesPlayer: Piece[];
  setPiecesPlayer: (piecesPlayer: Piece[]) => void;
  setPieceSelecteToMove: (pieceSelecteToMove: Piece | undefined) => void;
  setShowNextMove: (showNextMove: string[]) => void;
  setIsTurnOfPlayer: Dispatch<SetStateAction<boolean>>;
  enemyPieces: Piece[];
  setEnemyPieces: (piecesPlayer: Piece[]) => void;
  setPieceSelecteToMoveEnemy: (pieceSelecteToMove: Piece | undefined) => void;
  setClearNextMoveEnemy: React.Dispatch<React.SetStateAction<string[]>>;
  saveInHistory:({newLocation,owner , piece }:HistoryMove)=>void
  kingWasDeath:()=>void
  makeUserMove:(uci:string)=>void
  playerVSPlayer:boolean
  setShowAlert:(showAlert:boolean)=>void
  setPeonIsGoal:(setPeonIsGoal:boolean)=>void
  setPeonInGolLocation:(setPeonInGolLocation:string)=>void
}) => {
  const isSameLocation = pieceSelecteToMove?.initialPlace === newLocation
  const oldPieces = piecesPlayer.filter(
    (piece) => piece.initialPlace !== pieceSelecteToMove?.initialPlace
  );
  let isKill = ''
  
  
  

  if (pieceSelecteToMove?.isSelected)  pieceSelecteToMove.isSelected = false ;
  
   if (isSameLocation){
    // check if is same location
    setPieceSelecteToMove(undefined);
    setShowNextMove([]);
   
    return
   }

   if (showNextMove.includes(newLocation) ){
       // check if is occupied location
    if (piecesPlayer.map((piece) => piece.initialPlace).includes(newLocation)) {
      setPieceSelecteToMove(undefined);
      setShowNextMove([]);
      
      return
    }

    const savedata:HistoryMove = {
      newLocation:pieceSelecteToMove?.initialPlace + newLocation,
      owner : pieceSelecteToMove?.isEnemy ? "negras" : "blancas" ,
      piece : pieceSelecteToMove?.ficha as string
    }
    
    const isPeonUCI  = savedata.piece === "peon"
    
    saveInHistory(savedata)

       // delete a enemy piece at new location
    const isEnemyInNextLocation = enemyPieces.find(
      (piece) => piece.initialPlace === newLocation
    );


    if (isEnemyInNextLocation) {
      isKill = isPeonUCI ? `${pieceSelecteToMove?.initialPlace[0]}x` : 'x'
     
      saveInHistory({...savedata ,newLocation:"kill a " + isEnemyInNextLocation.ficha })
     
    }
    // const nameIsValid:PieceName = piecesToUci[savedata!.piece] as PieceName

    const transFormToUCI = `${ isPeonUCI ?'' : `${piecesToUci[savedata!.piece] &&  piecesToUci[savedata!.piece].toUpperCase()}`}  ${isKill}${ newLocation}`
    const uciMove = transFormToUCI.replace(/ /g, "")
   
      const peonIsInGoal = (pieceSelecteToMove?.ficha === "peon" ) && ( Number(newLocation[1]) === 8 || Number(newLocation[1]) === 1)

      if (peonIsInGoal) 
      {
        setShowAlert(true)
        setPeonIsGoal(true)
        isEnemyInNextLocation  ? setPeonInGolLocation("x"+newLocation): setPeonInGolLocation(newLocation)

        if (isEnemyInNextLocation){
          const newEnemyPieces = enemyPieces.filter(
            (piece) => piece.initialPlace !== isEnemyInNextLocation.initialPlace
          );
          // delete a enemy piece at new location
          if (!newEnemyPieces.map(piece => piece.ficha).includes("rey")){
     
            kingWasDeath()
          }
          
          setEnemyPieces(newEnemyPieces)
          
        }
        
      }else{
        setPeonInGolLocation('')

        try {
          makeUserMove(uciMove)

          const newPicesSet = [
            ...oldPieces,
            {
              ...pieceSelecteToMove,
              initialPlace: newLocation,
            },
          ];
          if (isEnemyInNextLocation){
            const newEnemyPieces = enemyPieces.filter(
              (piece) => piece.initialPlace !== isEnemyInNextLocation.initialPlace
            );
            // delete a enemy piece at new location
            if (!newEnemyPieces.map(piece => piece.ficha).includes("rey")){
       
              kingWasDeath()
            }
            
            setEnemyPieces(newEnemyPieces)
            
          }
        
          !peonIsInGoal && 
          setIsTurnOfPlayer((state: boolean) => !state) 
         
          setPiecesPlayer(newPicesSet as Piece[]);
          
         !peonIsInGoal &&
           setPieceSelecteToMove(undefined);
          setShowNextMove([]);
          setClearNextMoveEnemy([]);
         
        } catch (error) {
          console.log('error',error);
          
        }
        
      }
      
     

   
   
      // setIsTurnOfPlayer((state) => !state) 
   
  }

  
   setPieceSelecteToMoveEnemy(undefined);
    // setClearNextMoveEnemy([]);
 
};
