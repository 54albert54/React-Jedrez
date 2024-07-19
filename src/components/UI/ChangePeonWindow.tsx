
import useGameContext from "../../context";
import { piecesToUci } from "../chessIA";

import { generateRandomString } from "../const";
import { peonCanChangeTo, Piece } from "../data";


const changePeonInGoal = ({
  piece,
  change,
  savePices,
  makeUserMove,
  resetAlert,
  peonInGolLocation,
  saveInHistory,
  allmoves

}: {
  piece: Piece;
  change: string;
  savePices: any;
  makeUserMove:(uci:string)=>void
  resetAlert:()=>void
  peonInGolLocation: string;
  saveInHistory:(a:string)=>void
  allmoves:string[]
}) => {

 
  
  savePices((allPices:Piece[]) =>{
    const oldPieces = allPices.filter(
      (pieceSaved) => pieceSaved.idPiece !== piece.idPiece
    )
    
    
    const changedPeon = [...oldPieces, { ...piece, ficha: change, initialPlace: peonInGolLocation[0] == 'x' ? peonInGolLocation.replace('x','') :peonInGolLocation }];
    

    return changedPeon;
  })
  

  
 let extraMove = ''
  
  const UCIChangePeon = `${piece?.initialPlace[0]}${peonInGolLocation}=${piecesToUci[change].toUpperCase()}`;
  
  if (allmoves.includes(UCIChangePeon + "+") || allmoves.includes(UCIChangePeon + "#")){ 
    
    
    extraMove = allmoves.includes(UCIChangePeon + "+") ? "+" : "#"
  
}
  
  
  console.log('UCICh---',UCIChangePeon+extraMove);
  
  
  setTimeout(() => {
    resetAlert()
    saveInHistory(UCIChangePeon + extraMove)
    makeUserMove(UCIChangePeon + extraMove)
  }, 500);
  // setChangeTurn(state => !state);
};


const ChangePeonWindow = ({
  piece,
  makeUserMove,
  resetAlert,
  savePices,
  peonInGolLocation
}: {
  piece: Piece;
  resetAlert:()=>void
  savePices: any;
  makeUserMove: (uci: string) => void;
  peonInGolLocation: string;
}) => {
  const {saveInHistory , allmoves } = useGameContext()
  return (
    <section className="absolute z-50 w-[250px] h-[250px] bg-slate-200 shadow-inner translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md  pt-4 ">
      <p className=" text-center font-semibold text-xl ">Elige una Pieza</p>
      <ul className=" ">
        {peonCanChangeTo.map((change) => (
          <li
            key={generateRandomString(8)}
            onClick={() =>
              changePeonInGoal({
                piece,
                change,
                savePices,
                makeUserMove,
                resetAlert,
                peonInGolLocation,
                saveInHistory,
                allmoves

              })
            }
            className="flex justify-center items-center cursor-pointer my-4  bg-white w-32 mx-auto rounded-full border   border-emerald-500 px-2.5 py-0.5 text-emerald-700 active:bg-emerald-400 active:text-teal-50 hover:bg-emerald-300 shadow-md"
          >
            {change}
          </li>
        ))}
      </ul>
    </section>
  );
};



export default ChangePeonWindow; 