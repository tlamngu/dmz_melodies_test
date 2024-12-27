import React from 'react'
import "./style.css"

function GridBody({Menu, Content}) {
  return (
    <div className="GridBody">
        <div className="gridMenu">
            {Menu}
        </div>
        <div className="gridContent">
            {Content}
        </div>
    </div>
  )
}

export default GridBody