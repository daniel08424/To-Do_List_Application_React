import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'

const List = ({namees,handleCheck,deletefn,fetchError,loading}) => {
  
  return (
    <main>

      {/* //if there is fetchError it will display the error in the website
      
      // && -> means if the fetchError condition is true it will execute the <p> element
      // && -> basically an if statement shorter form*/}

      {fetchError && <p>{`Error : ${fetchError}`}</p>}

      {/* if loading is true this condition is executed */}
      {loading && <p>Loading....</p>}
      
      {/* if there is no error the below code is */}

      {(namees.length!=0) ? (
      <ul>
        {namees.map((names)=>
          <li className='items' key={names.id}>
            <input 
              type='checkBox' 
              checked={names.checked}
              onChange={()=> handleCheck(names.id)}
            /> 

            <label 
              onDoubleClick={()=> handleCheck(names.id)}
              style={(names.checked) ? {textDecoration:'line-through'}:null}
            >
            {names.item}</label>

            <FaTrashAlt 
              role='button'
              tabIndex='0'
              onClick={()=>deletefn(names.id)}
              aria-label={`Delete ${names.item}`}/>
          </li> 
        )}
      </ul>
    ) : (
      !loading && !fetchError && <p style={{fontFamily:'sans-serif',fontSize:'larger'}}>Your List is Empty</p>
    )}
    </main>
  )
}

export default List