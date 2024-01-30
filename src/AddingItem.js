import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'


const AddingItem = ({newItem,setNewItem,handleSubmit}) => {
  //UseRef is mainly used for focus shifting and create a reference for an event
  const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={(e)=>handleSubmit(e)}>
        <label>AddItems</label>
        <input
            id='AddItems'
            ref={inputRef}
            autoFocus
            required
            type='text'
            placeholder='Add Items Here'
            value={newItem}
            onChange = {(text)=> setNewItem(text.target.value)}
        />
        <button
            type='submit'
            aria-label='AddItems'
            onClick={()=>{
              inputRef.current.focus()
            }}
        >
        <FaPlus/>
        </button>
    </form>
  )
}

export default AddingItem