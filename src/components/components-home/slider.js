import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import server1 from '../../slike/server1,1.svg';
import server2 from '../../slike/server2.1.svg';
import server3 from '../../slike/server3.1.svg';
import server4 from '../../slike/server44.svg';


class Slider extends Component {
    state = { 
        
     }

    createAdd = () =>{
        
        
        return this.props.products.map((elem, index) =>{
            let server;
            if (index===0){
                server = server1;
            }
            else if (index === 1){
                server = server2;
            }
            else if (index === 3){
                server = server3;
            }
            else{
                server = server4;
            }
            return (
                
            <div className='product' key={index}>
                        
                <h1>{elem.title}</h1>
                <p className="product-slider-desc">{`${elem.description1} starting at just`} <strong className="text-gradient">{`${elem.minprice}€`} per {elem.pricedescription}</strong></p>
                <img src={server} alt=""/>
                    
            </div>
                
           
            )
        })
    }
    
    render() { 
        return ( 
            <div className="slider">
            <Carousel autoPlay="true" showThumbs={false} infiniteLoop="true" useKeyboardArrows="true" swipeable="true" interval="5000">
                
                    {this.createAdd()}
                
            </Carousel>
            </div>
        );
    }
}
 
export default Slider;

			
			
				
					
				