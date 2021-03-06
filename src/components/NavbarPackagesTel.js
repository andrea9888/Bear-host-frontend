import React, { Component } from 'react';
import {Link} from "react-router-dom";
class PackagesTel extends Component {
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
           <div uk-accordion={bool} className="list">
            <li className={`list-mem ${parent}`}><Link to="/vps" className={acc}>Paketi</Link>
              <div className={drpCont}>
                <ul className={drpNav}>
                  <li><Link to="/vps">VPS</Link></li>
                  <li><Link to="/shared">Shared hosting</Link></li>
                  <li><Link to="/dedicated">Dedicated Servers</Link></li>
                  <li><Link to="/mecloud">ME Cloud Servis</Link></li>
                </ul>
              </div>
            </li>
            </div> 
            );
    }
}
 
export default PackagesTel;