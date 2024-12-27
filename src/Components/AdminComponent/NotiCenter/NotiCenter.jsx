import React from 'react';
import "./style.css"

function NotiCenter({ notis = [] }) {
    const DeleteNoti = (e) => {
        let TargetIndex = Number( e.target.parentNode.getAttribute("keyindex"));
        notis.splice(TargetIndex, 1);
        e.target.parentNode.remove();
    }
    return (
        <div className='NotiCenter'>
            {
                notis.map((noti, index) => {
                    console.log("Loading notifications.");
                    return (
                        <div keyindex={index} className="Noti">
                            <p className='poppins poppins-small'>
                                {noti.provider}
                            </p>
                            <p className='poppins poppins-medium'>
                                {noti.content}
                            </p>
                            <button className='poppins NotiButton' onClick={DeleteNoti}>x</button>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default NotiCenter;
