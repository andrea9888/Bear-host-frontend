import React from 'react';
import '../styles/Home.css';
import '../styles/HomeResponsive.css'
import Navbar from './Navbar';
import {Link} from "react-router-dom";
import logo from '../slike/logo.svg';
export const Home = () => {
  return (
    
      <header>
        
        
        <img className="logo" src={logo} alt=""/>
      </header>
    

  );
  
  
  
  
};
