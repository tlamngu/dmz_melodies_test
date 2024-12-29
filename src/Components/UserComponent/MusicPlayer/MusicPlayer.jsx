import React, { useState } from 'react'
import "./style.css"
import timg from "./test.png"

import MusicQueue from '../MusicQueue/MusicQueue'
import MusicCard from '../MusicCard/MusicCard'

function MusicPlayer({queueList = [], show}) {
    const DevelopmentMode = true;
    const [QueueList, setQueueList] = useState(queueList.length == 0 && DevelopmentMode  ?  [ 
            { id: 1, img: "/public/timg.png", title: 'Song One', artists: 'Artist A' }, 
            { id: 2, img: "/public/timg.png", title: 'Song Two', artists: 'Artist B' }, 
            { id: 3, img: "/public/timg.png", title: 'Song Three', artists: 'Artist C' }
        ] : queueList
    );
    return (
        <div className={show ? "musicPlayer show" : "musicPlayer hide"}>
            <img src={timg} alt="" />
            <h2 className="montserrat montserrat-larger montserrat-bold">Triệu điều nhỏ xíu xiêu lòng</h2>
            <p className='montserrat'>Đen Vâu</p>
            <div className="ArtistInfo poppins">
                <div className="AvatarBox">
                    <img src={timg} alt="" />
                    <h3 className=''>Den Vau</h3>
                    <p className='poppins-small'>23K monthly listener</p>
                </div>
                <div className="InfoBox">
                    <p className='poppins-small'>Lorel ispum doamet info nagiv amesta do remo tet.</p>
                    <div className="Buttons ">
                        <button className='poppins'>
                            Follow
                        </button>
                        <button className='poppins'>
                            Details
                        </button>
                    </div>
                </div>
            </div>
            <div className="QueueBox">
                <h4 className='poppins'>Next in Queue:</h4>
                <div className="QueueList">
                    <MusicQueue initialQueue={QueueList}> 
                        <MusicCard /> 
                    </MusicQueue>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer