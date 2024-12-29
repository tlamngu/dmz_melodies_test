// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import GridLayout from './Components/UserComponent/GridLayout/GridLayout';
import ControllerBar from './Components/UserComponent/ControllerBar/ControllerBar';
import MusicPlayer from './Components/UserComponent/MusicPlayer/MusicPlayer';
import Menu from "./Components/menu/menu"
const App = () => {
  const development = true;
  const [MusicMeta, setMusicData] = useState(
    development ? 
    {
      "MusicID": "#96aff",
      "MusicTitle": "Nhớ Một Người - The SHEEP",
      "Authors": [
          "a32aee34-fe1e-4aa2-8719-2686d28561ce\t"
      ],
      "AlbumID": [],
      "StreamCount": 0
  } : {}
  )
  const [audioStream, setAudioStream] = useState('');
  const [showMuiscPlayer, setShowMusicPlayer] = useState(false);
  return (
    <>
      <GridLayout colNum={showMuiscPlayer ? 3 : 2}>
        <Menu/>
        <p className='poppins'>Component 2</p>
        <MusicPlayer show={showMuiscPlayer}/>
      </GridLayout>
      <ControllerBar />
      <audio>
        <source src={audioStream} type='audio/mpeg'/>
      </audio>
    </>
  );
};

export default App;
