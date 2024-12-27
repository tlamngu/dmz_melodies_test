import React from 'react'
import { useState } from 'react'
import "./style.css"


function MenuButton({ButtonText, OnClick, style}) {
    // const [selected, setSelected] = useState(0);
    function MenuButtonClicked(e){
        console.log(e.target.parentNode);
        for (let index = 0; index < e.target.parentNode.parentNode.children.length; index++) {
            const element = e.target.parentNode.parentNode.children[index];
            console.log(element.className)
            if(element.className == "MenuButton"){
                console.log("Changed color.");
                element.style.backgroundColor = "#141414"
                // element.setSelected(0);
            }
            // setSelected(1);
        }
        e.target.parentNode.style.backgroundColor = '#202020';
        OnClick();
    }

    return (
        <div className="MenuButton" style={style}>
            <button onClick={MenuButtonClicked} className='poppins'>{ButtonText}</button>
            {/* <p>{ButtonText}</p> */}
        </div>
    )
}

export default MenuButton