import React from 'react'

const search = ({search,setSearch}) => {
  return (
    <form className='searchForm' onSubmit = {(e)=>e.preventDefault()}>
        <label>Search</label>
        <input 
            id='search'
            type='text'
            role='search box'
            placeholder='Search Items'
            value = {search}
            onChange = {(e)=>setSearch(e.target.value)}
        />
    </form>
  )
}

export default search