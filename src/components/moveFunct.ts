import { Piece } from "./data";

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
  setClearNextMoveEnemy
}: {
  newLocation: string;
  showNextMove: string[];
  pieceSelecteToMove: Piece | undefined;
  piecesPlayer: Piece[];
  setPiecesPlayer: any;
  setPieceSelecteToMove: any;
  setShowNextMove: any;
  setIsTurnOfPlayer: any;
  enemyPieces: Piece[];
  setEnemyPieces: any;
  setPieceSelecteToMoveEnemy: any
  setClearNextMoveEnemy: any
}) => {
  const isSameLocation = pieceSelecteToMove?.initialPlace === newLocation
  const oldPieces = piecesPlayer.filter(
    (piece) => piece.initialPlace !== pieceSelecteToMove?.initialPlace
  );
  

  if (pieceSelecteToMove?.isSelected)  pieceSelecteToMove.isSelected = false ;
  
   if (isSameLocation){
    // check if is same location
    setPieceSelecteToMove(undefined);
    setShowNextMove([]);
   
    return
   }
   if (showNextMove.includes(newLocation)){
    // setClearNextMoveEnemy([]);
    

 
       // check if is occupied location
    if (piecesPlayer.map((piece) => piece.initialPlace).includes(newLocation)) {
      setPieceSelecteToMove(undefined);
      setShowNextMove([]);
      
      return
    }

       // delete a enemy piece at new location
    const isEnemyInNextLocation = enemyPieces.find(
      (piece) => piece.initialPlace === newLocation
    );

    if (isEnemyInNextLocation) {
      const newEnemyPieces = enemyPieces.filter(
        (piece) => piece.initialPlace !== isEnemyInNextLocation.initialPlace
      );
      // delete a enemy piece at new location
      setEnemyPieces(newEnemyPieces);
    }




   
    const newPicesSet = [
      ...oldPieces,
      {
        ...pieceSelecteToMove,
        initialPlace: newLocation,
        isSelected: false,
      },
    ];
    setPiecesPlayer(newPicesSet);
    setIsTurnOfPlayer((state) => !state);
    setPieceSelecteToMove(undefined);
    setShowNextMove([]);
    setClearNextMoveEnemy([]);
    
   
  }

  
   setPieceSelecteToMoveEnemy(undefined);
    // setClearNextMoveEnemy([]);
 
};
