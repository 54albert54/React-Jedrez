import { useState } from 'react'

import './App.css'

const cols = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i'];


const aleatoryLocation = (): string => {
  const result = cols[Math.floor(Math.random() * cols.length)] + Math.floor((Math.random()  * cols.length) + 1)
  
  return result

}
const allHearts =[ aleatoryLocation() , aleatoryLocation() , aleatoryLocation()]


function App() {
  const [pieceMoved, setPieceMoved] = useState('')
  const [nextMove, setNextMove] = useState('')
  const [playerLocation, setPlayerLocation] = useState('a8')
  const [showNextMove, setShowNextMove] = useState(false)


  const currentLocation = {row:playerLocation[0] , col: Number(playerLocation[1])}
    const currentRowIndex = cols.indexOf(currentLocation.row)

    const validCol =  [currentLocation.col -1, currentLocation.col ,currentLocation.col +1]
    const validRow =  [cols[currentRowIndex -1],cols[currentRowIndex ] , cols[currentRowIndex +1]]

    const youCanMove:string[] =[ ]

    for (let i = 0; i < validCol.length; i++) {
      for (let j = 0; j < validRow.length; j++) {
        youCanMove.push(validRow[j] + validCol[i])
      }
     }
   


 
  
  const chooseNextMove = (spot :{row: string, col: number}) => {
    
    
    
    
    
    // if (playerLocation === spot.row + spot.col) return 
    if (youCanMove.includes(spot.row + spot.col)) {
      setPlayerLocation(spot.row + (spot.col ))
    }
    console.log('youCanMove',spot);
  }



  return (

    <main>
      <section>
      <label htmlFor="text">
        <h1>la ficha se movera: {nextMove}  </h1> 
        <input onChange={(e) => setPieceMoved(e.target.value)} className='border border-red-700' type="text" />
      </label>
      <button onClick={() => setNextMove(pieceMoved)}  >mover</button>
      </section>
     
    <section className='w-[800px] border  mx-auto mt-20 flex  relative '>
      
      <div >{
        cols.map((col) => (
          <div key={col} className='col'>
            <h1>{col}</h1>
          </div>
        ))
      }
      </div>
     
      <div className='border'>
     
      {cols.map((col ,indexRow) => (
        <div className='row '>
        <div key={col} className='col flex'>
          <div className='flex'>
            
            {cols.map((row , index) =>{ 
              const isBlack = indexRow % 2 === 0 ? index % 2 === 0 : index % 2 !== 0
              const location = `${row + (indexRow+ 1)}`
              const isHeart = allHearts.includes(location)
              const heartIndex = allHearts.indexOf(location)

              return(
                <div 
                key={row} 
                onClick={() => chooseNextMove({row , col: (indexRow + 1)})}
                className={`${isBlack  ? 'bg-white text-black' : 'bg-black text-white'} relative w-16 h-16 border-black border`}>
                 {
                  isHeart  ? <Ficha id={heartIndex.toString()} /> :  <div className={` row w-16 h-16  flex justify-center items-center  `}>{location}</div>
                 }
                 <div className='relative bottom-16'>
                 
                { 
                 playerLocation === location && <Player setShowNextMove={setShowNextMove}  />
                }
                {
                 showNextMove && youCanMove.includes(location) && <div className='absolute z-30 w-16 h-16 bg-yellow-500/50'></div>
                }
                </div>
               </div>
            )})}
          </div>
          </div>
        </div>
      ))}
      </div>
    </section>
    </main>
  )
}

export default App


const Ficha = ({id}: {id: string}) => {
  return (
    <div 
    key={id}
    className='relative z-30 w-[62px] h-[62px] bg-blue-300/50 flex justify-center items-center'>
      <img className='w-[50px] h-[50px] absolute z-10 ' src="/heart.png" alt="" />
      <p className='relative z-20 text-white '>{id}</p>
    </div>
  )


}

function Player({setShowNextMove}: {setShowNextMove: (e:any) => void}) {
  return (
    <div 
    className=" z-60 w-[62px] h-[62px] bg-red-500"
    onClick={() => setShowNextMove((e:boolean) => !e)}
    >
      <p>Player</p>
    </div>
  )
}

