import React from 'react'
import "./GridLayout.css"

function GridLayout({children}) {
  return (
    <div className='gridlayout'>
        {children}
    </div>
  )
}

export default GridLayout