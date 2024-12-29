import React from 'react';
import './MusicCard.css';

const MusicCard = ({ img, title, artists }) => {
    return (
        <div className="music-card">
            <img src={img} style={{borderRadius:"0.5rem"}} className="music-card-img" />
            <div className="music-card-info">
                <h4 className='poppins'>{title}</h4>
                <p className='poppins'>{artists}</p>
            </div>
        </div>
    );
};

export default MusicCard;
