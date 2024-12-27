import React from 'react'
import AdminDashboardSVG from "../../../../assets/AdminDashboard.svg"
import "./style.css"

function MenuBar({children}) {
  return (
    <div className="MenuBar">
        <div className="Logo">
            <img src={AdminDashboardSVG} alt="admin_dash_svg" />
            <hr />
            {children}
        </div>
    </div>
  )
}

export default MenuBar