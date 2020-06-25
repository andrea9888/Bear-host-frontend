import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import server from '../../slike/server1,1.svg';


class Slider extends Component {
    state = { 
        
     }

    createAdd = () =>{
        return this.props.products.map((elem, index) =>{
        
            return (
                
            <div className='product' key={index}>
                        
                <h1>{elem.title}</h1>
                <p className="product-slider-desc">{elem.description1} <strong className="text-gradient">{`${elem.minprice}€`} per {elem.pricedescription}</strong></p>
                <img src={server} alt=""/>
                    
            </div>
                
           
            )
        })
    }
    
    render() { 
        return ( 
            <div className="slider">
            <Carousel autoPlay showThumbs={false}>
                
                    {this.createAdd()}
                
            </Carousel>
            </div>
        );
    }
}
 
export default Slider;

			
			
				
					
				