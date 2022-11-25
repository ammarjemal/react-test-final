import React from 'react'

const Card = (props) => {
  return (
    <div className={`bg-slate-100 rounded-lg p-5 ${props.className}`}>
        {props.children}
    </div>
  )
}
export default Card;