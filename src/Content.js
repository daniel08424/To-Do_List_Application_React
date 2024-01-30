import React from 'react'
import { useState } from 'react'

const Content = () => {
    const Contents=()=>{
    const name = ['give','show','spend']
    const num = Math.floor(Math.random()*2)
    return name[num]
    }

    const handleClick=()=>{
      console.log("The event is clicked")
      setName(()=>Contents())        
    }

    const handleClick2=(name,e)=>{
      console.log(`Hello ${name}`)
      console.log(e.target.innerText)
    }

    // const [count,setCount] = useState(0)

    // const increment =()=>{
    //   setCount((PrevCount)=> PrevCount+1)
    // }

    // const decrement =()=>{
    //   setCount((PrevCount)=> PrevCount-1)
    // }

    const [name,setName]= useState("get")

  return (
    <div>
        <p>Lets {name} Money</p>
        <button onClick={handleClick}>Click Event</button><br></br>
        <button onClick={(e)=>handleClick2('Daniel',e)}>Name</button>
        <p>Lets play the game</p>

        {/* <div className='button'> 
            <button onClick={decrement}>-</button>
            <p>{count}</p>
            <button onClick={increment}>+</button>
        </div> */}
        
    </div>
  )
}

export default Content