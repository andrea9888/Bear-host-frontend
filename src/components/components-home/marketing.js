import React, { Component } from 'react';
import '../../styles/marketing.css'
class Marketing extends Component {
    state = { 
        
     }
    
    createAdd = () =>{
        return this.props.products.map((elem, index) =>{
        
            return (
                
            <div className="marketing-card">
                <div className="uk-card uk-card-default uk-card-hover uk-card-body">
                    <h3 className="uk-card-title">{elem.title}</h3>
                    <p className="text-card">{elem.description2}</p>
                </div>
            </div>
        )
                
           
            
        })
    }

    render() { 
        return ( 
            
            <div className="marketing"> 
                {this.createAdd()};
            </div>
         );
    }
}
 
export default Marketing;