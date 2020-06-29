import React, { Component } from 'react';
import '../../styles/marketing.css'
import icon1 from '../../slike/ikonica1.svg';
import icon2 from '../../slike/ikonica2.svg';
import icon3 from '../../slike/ikonica3.svg';
import icon4 from '../../slike/ikonica4.svg';

class Marketing extends Component {
    state = { 
        
     }
    
    createAdd = () =>{
        return this.props.products.map((elem, index) =>{
            var icon, cls;
            if (index===0) {
                icon=icon1 
                cls="cls: uk-animation-slide-left;  delay: 900";
            } 
            else if (index===1) {
                icon=icon2;
                cls="cls: uk-animation-slide-top;  delay: 900";
            }

            else if (index===2) {
                icon=icon3; 
                cls="cls: uk-animation-slide-bottom;  delay: 900";
            }
            else {
                icon=icon4;
                cls="cls: uk-animation-slide-right;  delay: 900";
            }

            return (
            <div className="container-marketing" key={index}>  
                <img className="icon-marketing" src={icon} alt="" uk-scrollspy={cls}/>
                <div className="marketing-card">
                    <div className="uk-card uk-card-default uk-card-hover uk-card-body">
                        <h3 className="uk-card-title">{elem.title}</h3>
                        <p className="text-card">{`${elem.description2.slice(0,100)} ...`}</p>
                        <button className="uk-button uk-button-text">Saznaj više &rarr;</button>
                    </div>
                </div>
            </div>  
        )
                
           
            
        })
    }

    render() { 
        return ( 
            <div className="marketing-wrap">
                <h1 className="naslov-marketing"><i>Široka ponuda hostinga za brojne namjene</i></h1>
                <div className="marketing"> 
                    {this.createAdd()};
                </div>
            </div>
         );
    }
}
 
export default Marketing;