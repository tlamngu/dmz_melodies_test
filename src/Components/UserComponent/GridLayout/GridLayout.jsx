import React from 'react'
import "./GridLayout.css"

function GridLayout({children, colNum = 3}) {
  return (
    <div className={`gridlayout gridLayout${colNum}Col`}>
        {children}
    </div>
  )
}

export default GridLayout