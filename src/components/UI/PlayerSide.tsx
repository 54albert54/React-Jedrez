import { Piece } from "../data";

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
  showNextMove: string[];
  pieceSelecteToMove: Piece | undefined;
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
    <div
      id={!isEnemy ? "white side" : "black side"}
      className={` relative bottom-16 z-90  `}
    >
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

export default PlayerSide;