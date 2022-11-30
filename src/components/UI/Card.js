import React from 'react'
// Custom wrapper component
const Card = (props) => {
  return (
    <div className={`bg-slate-100 rounded-lg p-5 ${props.className}`}>
        {props.children}
    </div>
  )
}
export default Card;