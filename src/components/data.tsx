
export const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
export type PieceName = "peon" | "caballo" | "alfil" | "rey" | "reina" | "torre";
export interface HistoryMove {
  owner:'blancas' | 'negras'
  piece:string
  newLocation:string
}

export interface Piece {
  idPiece: string;
  ficha: string;
  initialPlace: string;
  isSelected?: boolean;
  isEnemy?: boolean;
}

export const fichasPlayer1: Piece[] =

[
  { ficha: "peon", initialPlace: "a2", idPiece: "RO5FCzYW" },
  { ficha: "peon", initialPlace: "b2", idPiece: "DmDg6pMZ" },
  { ficha: "peon", initialPlace: "c2", idPiece: "pqMYbTSA" },
  { ficha: "peon", initialPlace: "d2", idPiece: "7wVMVv39" },
  { ficha: "peon", initialPlace: "e2", idPiece: "4eNv0f26" },
  { ficha: "peon", initialPlace: "f2", idPiece: "e7jH56Nh" },
  { ficha: "peon", initialPlace: "g2", idPiece: "oxlOxvTP" },
  { ficha: "peon", initialPlace: "h2", idPiece: "pLdhQtvS" },
  { ficha: "torre", initialPlace: "a1", idPiece: "RAJ0BQpl" },
  { ficha: "torre", initialPlace: "h1", idPiece: "0bIZjz5j" },
  { ficha: "caballo", initialPlace: "b1", idPiece: "U4rClwpb" },
  { ficha: "caballo", initialPlace: "g1", idPiece: "yWFSNvVk" },
  { ficha: "alfil", initialPlace: "c1", idPiece: "tG6d59Ny" },
  { ficha: "alfil", initialPlace: "f1", idPiece: "K9J9V7Sa" },
  { ficha: "rey", initialPlace: "e1", idPiece: "3ezzL8Ku" },
  { ficha: "reina", initialPlace: "d1", idPiece: "aBVWNuyl" },
];









export const fichasPlayer2: Piece[] =

[
  { ficha: "peon", initialPlace: "a7", idPiece: "7frqtHGA" },
  { ficha: "peon", initialPlace: "b7", idPiece: "4XXkdK6y" },
  { ficha: "peon", initialPlace: "c7", idPiece: "DUPCkshs" },
  { ficha: "peon", initialPlace: "d7", idPiece: "8hxS60KK" },
  { ficha: "peon", initialPlace: "e7", idPiece: "0hL8OfYW" },
  { ficha: "peon", initialPlace: "f7", idPiece: "fwnA9gIK" },
  { ficha: "peon", initialPlace: "g7", idPiece: "g27NM3Lz" },
  { ficha: "peon", initialPlace: "h7", idPiece: "YiEn5Z1f" },
  { ficha: "torre", initialPlace: "a8", idPiece: "yUG5v23e" },
  { ficha: "torre", initialPlace: "h8", idPiece: "6PbZEUoC" },
  { ficha: "caballo", initialPlace: "b8", idPiece: "FZ2SoHN9" },
  { ficha: "caballo", initialPlace: "g8", idPiece: "rkfMoeap" },
  { ficha: "alfil", initialPlace: "c8", idPiece: "sWJWqoJT" },
  { ficha: "alfil", initialPlace: "f8", idPiece: "RaeHTDaR" },
  { ficha: "rey", initialPlace: "e8", idPiece: "Y1ewJ8J6" },
  { ficha: "reina", initialPlace: "d8", idPiece: "cw63CfYg" },
];

export const peonCanChangeTo: string[] = ["torre", "caballo", "alfil",  "reina"]





// [
//   { ficha: "peon", initialPlace: "a2", idPiece: "RO5FCzYW" },
//   { ficha: "peon", initialPlace: "b2", idPiece: "DmDg6pMZ" },
//   { ficha: "peon", initialPlace: "c2", idPiece: "pqMYbTSA" },
//   { ficha: "peon", initialPlace: "d2", idPiece: "7wVMVv39" },
//   { ficha: "peon", initialPlace: "e2", idPiece: "4eNv0f26" },
//   { ficha: "peon", initialPlace: "f2", idPiece: "e7jH56Nh" },
//   { ficha: "peon", initialPlace: "g2", idPiece: "oxlOxvTP" },
//   { ficha: "peon", initialPlace: "h2", idPiece: "pLdhQtvS" },
//   { ficha: "torre", initialPlace: "a1", idPiece: "RAJ0BQpl" },
//   { ficha: "torre", initialPlace: "h1", idPiece: "0bIZjz5j" },
//   { ficha: "caballo", initialPlace: "b1", idPiece: "U4rClwpb" },
//   { ficha: "caballo", initialPlace: "g1", idPiece: "yWFSNvVk" },
//   { ficha: "alfil", initialPlace: "c1", idPiece: "tG6d59Ny" },
//   { ficha: "alfil", initialPlace: "f1", idPiece: "K9J9V7Sa" },
//   { ficha: "rey", initialPlace: "d1", idPiece: "3ezzL8Ku" },
//   { ficha: "reina", initialPlace: "e1", idPiece: "aBVWNuyl" },
// ];



