import React from 'react';
import '../styles/Home.css';
import '../styles/HomeResponsive.css'
import { Link } from "react-router-dom";
import logo from '../slike/logo.svg';
export const Home = () => {
  return (
    <React.Fragment>
      <header>
        
        
        <img className="logo" src={logo} alt=""/>
      </header>
      <h1>HOME</h1>
      </React.Fragment>
  );
  
  
  
  
};
