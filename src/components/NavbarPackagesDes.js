import React, { Component } from 'react';
import {Link} from "react-router-dom";
class PackagesDes extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { 

         }
         
    }
    
    render() { 
        let bool = this.props.pack ? 'true' : 'false';
         let parent = this.props.pack? 'uk-open' : 'uk-parent';
         let acc = this.props.pack? 'uk-accordion-title':'';
         let drpCont = this.props.pack? 'uk-accordion-content' : 'uk-navbar-dropdown';
         let drpNav = this.props.pack? '':'uk-nav uk-navbar-dropdown-nav';

        return ( 
           
            <li className={parent}><Link to="/vps" className={acc} >Paketi</Link>
              <div className={drpCont}>
                <ul className={drpNav}>
                  <li><Link to="/vps">VPS</Link></li>
                  <li><Link to="/shared">SHARED HOSTING</Link></li>
                  <li><Link to="/dedicated">DEDICATED SERVERS</Link></li>
                  <li><Link to="/mecloud">ME CLOUD SERVIS</Link></li>
                </ul>
              </div>
            </li>
             
            );
    }
}
 
export default PackagesDes;