import React from 'react'

const Footer = (props) => {
    const year = new Date();
  return (
    <footer className = "footer">
      {(props.length) ? `${props.length} List ${(props.length===1 ? "Item" : "Items")}` : "No Items Available" }
      </footer>
  )
}

export default Footer 