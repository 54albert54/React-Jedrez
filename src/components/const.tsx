

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function uniqueElements(arr1: string[], arr2: string[]) {
  const uniqueInArr1 = arr1.filter((element) => arr2.includes(element));
  // const uniqueInArr2 = arr2.filter((element) => !arr1.includes(element));

  
  // console.log('[input]',[...arr1]);
  // console.log('[output]',[...uniqueInArr1]);
  

   return [...uniqueInArr1 ];


}
interface ChessMove {
  piece: string;
  from: string;
  to: string;
}

function algebraicToUCI(algebraic: string): string | null {
  const file = algebraic.charAt(0);
  const rank = algebraic.charAt(1);

  if (file < 'a' || file > 'h' || rank < '1' || rank > '8') {
      return null; // Verificar si la entrada es válida
  }

  const uciFile = String.fromCharCode(file.charCodeAt(0) - 'a'.charCodeAt(0) + 97);
  const uciRank = String.fromCharCode('8'.charCodeAt(0) - (parseInt(rank) - 1));

  return uciFile + uciRank;
}

function moveObjectToUCI(move: ChessMove): string | null {
  const uciFrom = algebraicToUCI(move.from);
  const uciTo = algebraicToUCI(move.to);

  if (!uciFrom || !uciTo) {
      return null; // Manejar caso inválido
  }

  return `${uciFrom}${uciTo}`;
}

// Ejemplo de uso:
const chessMove: ChessMove = { piece: "queen", from: "h8", to: "h5" };
const uciMove = moveObjectToUCI(chessMove);

if (uciMove) {
  console.log(`El movimiento UCI es ${uciMove}`);
} else {
  console.log(`El movimiento ${JSON.stringify(chessMove)} no es válido.`);
}
