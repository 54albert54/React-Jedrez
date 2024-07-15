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
}) => {
  if (showNextMove.includes(newLocation)) {
    const oldPieces = piecesPlayer.filter(
      (piece) => piece.initialPlace !== pieceSelecteToMove?.initialPlace
    );

    if (
      pieceSelecteToMove !== undefined &&
      pieceSelecteToMove?.isSelected === true
    ) {
      const spotIsFree = oldPieces
        .map((piece) => piece.initialPlace)
        .includes(newLocation);

      const isNotFreeEnemy = enemyPieces.find(
        (piece) => piece.initialPlace === newLocation
      );

      if (isNotFreeEnemy) {
        const newEnemyPieces = enemyPieces.filter(
          (piece) => piece.initialPlace !== isNotFreeEnemy.initialPlace
        );
        setEnemyPieces(newEnemyPieces);
      }

      if (!spotIsFree) {
        const newPicesSet = [
          ...oldPieces,
          {
            ...pieceSelecteToMove,
            initialPlace: newLocation,
            isSelected: false,
          },
        ];
        setIsTurnOfPlayer((state) => !state);
        setPiecesPlayer(newPicesSet);
      } else {
        console.log("is noo free");
      }
    }

    setShowNextMove([]);
    setPieceSelecteToMove(undefined);
  }
};
