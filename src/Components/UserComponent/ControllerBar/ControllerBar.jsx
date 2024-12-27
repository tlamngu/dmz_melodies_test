import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute, FaSync, FaList } from 'react-icons/fa';
import './style.css';

const ControllerBar = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isLooping, setIsLooping] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(300); // Placeholder duration (e.g., 5 minutes)
    
    useEffect(() => {
        if(localStorage.getItem("_current_vol")){
            console.log("loaded volume memorizing")
            setVolume(Number(localStorage.getItem("_current_vol")))
        }else{
            console.log("initialized volume memorizing")
            localStorage.setItem("_current_vol", volume);
        }
    }, []);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    const handleVolumeChange = (e) => {
        console.log("Volume changed")
        setVolume(e.target.value);
        localStorage.setItem("_current_vol", e.target.value);
    };

    const handleNext = () => {
        console.log('Next track');
    };

    const handleBack = () => {
        console.log('Previous track');
    };

    const handleQueue = () => {
        console.log('Queue');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="controller-bar">
            <div className="song-info">
                <img src="src\assets\Logo.png" alt="" className="song-banner" />
                <div className="song-details">
                    <div className="song-title poppins">DMZ Anthem</div>
                    <div className="song-artist poppins">Art dezuz, Malutz vorem</div>
                </div>
            </div>
            <div className="controls">
                <div className="controls-btn">
                    <button onClick={handleBack}>
                        <FaBackward />
                    </button>
                    <button onClick={togglePlayPause} id='playpause'>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={handleNext}>
                        <FaForward />
                    </button>
                </div>
                
                <div className="progress-container">
                    <span className="current-time">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => setCurrentTime(e.target.value)}
                    />
                    <span className="duration">{formatTime(duration - currentTime)}</span>
                </div>
            </div>
            <div className="extra-controls">
                <button onClick={toggleLoop}>
                    <FaSync className={isLooping ? 'active' : ''} />
                </button>
                <button onClick={handleQueue}>
                    <FaList />
                </button>
                <div className="volume-control">
                    <FaVolumeMute />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <FaVolumeUp />
                </div>
            </div>
        </div>
    );
};

export default ControllerBar;
