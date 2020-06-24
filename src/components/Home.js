import React from 'react';

import { Link } from "react-router-dom";
import logo from '../slike/logo.svg';
import Slider from './components-home/slider';
import Enterprise from './components-home/enterprise';
import '../styles/Home.css';
import '../styles/HomeResponsive.css';

export const Home = () => {
  return (
    <div className="body">
      <header className="bearhost">
        <img className="logo" src={logo} alt=""/>
        <main id="main">
          <Slider></Slider>
          
        </main>
        
      </header>
      <Enterprise></Enterprise>
      </div>
  );
  
  
  
  
};
