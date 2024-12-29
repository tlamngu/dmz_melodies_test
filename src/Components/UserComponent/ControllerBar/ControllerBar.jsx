import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute, FaSync, FaList } from 'react-icons/fa';
import './style.css';

const ControllerBar = ({ HandleDurationChange = (dura) => {}, HandleMusicPlayPause = (s) => {}, HandleMusicNext = () => {}, HandleMusicBack = () => {}, HandleVolChange = (vol) => {}, HandleLoop = (isLoop) => {}, musicImg, musicTitle, MusicArtist, MusicDuration=0}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isLooping, setIsLooping] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(MusicDuration); // Placeholder duration -- 5min

    useEffect(() => {
        if (localStorage.getItem("_current_vol")) {
            console.log("loaded volume memorizing");
            setVolume(Number(localStorage.getItem("_current_vol")));
        } else {
            console.log("initialized volume memorizing");
            localStorage.setItem("_current_vol", volume);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey) {
                switch (e.key) {
                    case 'ArrowRight':
                        handleNext();
                        break;
                    case 'ArrowLeft':
                        handleBack();
                        break;
                    default:
                        break;
                }
            } else {
                switch (e.key) {
                    case ' ':
                        togglePlayPause();
                        break;
                    case 'ArrowRight':
                        changeDuration(10);
                        break;
                    case 'ArrowLeft':
                        changeDuration(-10);
                        break;
                    case 'ArrowUp':
                        adjustVolume(10);
                        break;
                    case 'ArrowDown':
                        adjustVolume(-10);
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying, volume, currentTime]);

    const adjustVolume = (change) => {
        const newVolume = Math.min(100, Math.max(0, volume + change));
        setVolume(newVolume);
        localStorage.setItem("_current_vol", newVolume);
        HandleVolChange(newVolume);
    };

    const changeDuration = (change) => {
        const newTime = Math.min(duration, Math.max(0, currentTime + change));
        setCurrentTime(newTime);
        HandleDurationChange(newTime);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        HandleMusicPlayPause(!isPlaying);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
        HandleLoop(!isLooping);
    };

    const handleVolumeChange = (e) => {
        console.log("Volume changed");
        setVolume(Number(e.target.value));
        localStorage.setItem("_current_vol", e.target.value);
        HandleVolChange(Number(e.target.value));
    };

    const handleNext = () => {
        console.log('Next track');
        HandleMusicNext();
    };

    const handleBack = () => {
        console.log('Previous track');
        HandleMusicBack();
    };

    const handleQueue = () => {
        console.log('Queue');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const HandleDura = (e) => {
        setCurrentTime(e.target.value);
        HandleDurationChange(Number(e.target.value));
    };

    return (
        <div className="controller-bar">
            <div className="song-info">
                <img src={musicImg ? musicImg:"src/assets/Logo.png"} alt="" className="song-banner" />
                <div className="song-details">
                    <div className="song-title poppins">{musicTitle ? musicTitle : "Track not selected"}</div>
                    <div className="song-artist poppins">{MusicArtist ? MusicArtist : "DMZ Melodies"}</div>
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
                        onChange={HandleDura}
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
