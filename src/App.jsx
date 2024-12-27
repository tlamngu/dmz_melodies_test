// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import GridLayout from './Components/UserComponent/GridLayout/GridLayout';
import ControllerBar from './Components/UserComponent/ControllerBar/ControllerBar';
const App = () => {

    return (
      <>
        <GridLayout>
          <p className='poppins'>Component 1</p>
          <p className='poppins'>Component 2</p>
          <p className='poppins'>Component 3</p>
        </GridLayout>
        <ControllerBar/>
      </>
      );
};

export default App;
