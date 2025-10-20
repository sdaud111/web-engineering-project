import React from 'react'

const Card = ({children, bg='bg-white'}) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md border-l-4 border-[#A1E3F9] hover:shadow-lg transition-all duration-300`}>
      {children}
    </div>
  )
}

export default Card
