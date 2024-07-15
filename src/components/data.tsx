const allMoves = () =>{
  const validCol = [
    currentLocation.col - 1,
    currentLocation.col,
    currentLocation.col + 1,
  ];
  const validRow = [
    cols[currentRowIndex - 1],
    cols[currentRowIndex],
    cols[currentRowIndex + 1],
  ];

  const youCanMove: string[] = [];

  for (let i = 0; i < validCol.length; i++) {
    for (let j = 0; j < validRow.length; j++) {
      const createdLocation = validRow[j] + validCol[i];

      type.initialPlace != createdLocation && youCanMove.push(createdLocation);
    }
  }
}

export const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
  ficha: string;
  initialPlace: string;
  isSelected?: boolean;
  isEnemy?: boolean;
}

export const fichasPlayer1 = [
  { ficha: "peon", initialPlace: "a7" },
  { ficha: "peon", initialPlace: "b7" },
  { ficha: "peon", initialPlace: "c7" },
  { ficha: "peon", initialPlace: "d7" },
  { ficha: "peon", initialPlace: "e7" },
  { ficha: "peon", initialPlace: "f7" },
  { ficha: "peon", initialPlace: "g7" },
  { ficha: "peon", initialPlace: "h7" },
  { ficha: "torre", initialPlace: "a8" },
  { ficha: "torre", initialPlace: "h8" },
  { ficha: "caballo", initialPlace: "b8" }, 
  { ficha: "caballo", initialPlace: "g8" },
  { ficha: "alfil", initialPlace: "c8" },
  { ficha: "alfil", initialPlace: "f8" },
  { ficha: "rey", initialPlace: "d8" },
  { ficha: "reina", initialPlace: "e8" },
];

export  const fichasPlayer2 = [
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