import React from 'react';

import logo from '../slike/logo.svg';
import Slider from './components-home/slider';
import Marketing from './components-home/marketing';
import Komentari from './components-home/Komentari';
import Enterprise from './components-home/enterprise';
import Footer from './Footer';
import '../styles/Home.css';
import '../styles/HomeResponsive.css';

export const Home = (props) => {
  return (
    <div className="body">
      <header className="bearhost">
        <img className="logo" src={logo} alt=""/>
        <main id="main">
          <Slider products={props.products}></Slider>
          
        </main>
        
      </header>
      <Enterprise></Enterprise>
      <Marketing products={props.products}></Marketing>
      <Komentari></Komentari>
      <Footer></Footer>
      </div>
  );
  
  
  
  
};
