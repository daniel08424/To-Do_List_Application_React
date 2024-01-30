  import React from 'react'

const Header = (props) => {
  return (
    <header className = "header" style={{textAlign:'center'}}>
        <h1>{props.title}</h1>
    </header>
  )
}

Header.defaultProps ={
  title:"To Do List"
}
export default Header 