import { generateRandomString } from "../const";

const UCIBoard =({showBoard}:{showBoard:string[]})=>{

  return(
    <div>
    {showBoard.map((line, index) => {
      const DataSquare = [];

      if (index != 10) {
        for (let i = 0; i < line.length; i++) {
          line[i] !== "" && DataSquare.push(line[i]);
        }
      }
      return (
        <div className={` flex`} key={generateRandomString(8)}>
          {DataSquare.map((square) => {
            return (
              <div key={generateRandomString(8)}>
                {(square === "p" ||
                  square === "n" ||
                  square === "b" ||
                  square === "q" ||
                  square === "k" ||
                  square === "r" ||
                  square === "P" ||
                  square === "N" ||
                  square === "B" ||
                  square === "Q" ||
                  square === "K" ||
                  square === "R" ||
                  square === ".") && (
                  <p
                    className={`w-4 h-5 border border-black  flex  justify-center items-center`}
                    key={generateRandomString(8)}
                  >
                    {square}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
    )
};

export default UCIBoard; 