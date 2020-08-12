import React from 'react';
import getProducts from '../services/getProducts.js';
import Footer from './Footer';
import {Notification} from '../components/Notifications.js'
import { auth } from "../auth_and_private/authService";
import listCards from '../services/listCards.js'
import sec1 from '../slike/enterprise1.svg';
import sec2 from '../slike/enterprise2.svg';
import sec3 from '../slike/enterprise3.svg';

import sec4 from '../slike/enterprise4.svg';
import sec5 from '../slike/enterprise5.svg';
import sec6 from '../slike/enterprise6.svg';


import '../styles/PackagePageHelper.css';
import logo from '../slike/logo.svg';

class PackagePageHelper extends React.Component{
    _isMounted = false;
    constructor(props){
        super(props)
        
        this.state={
            packageArgs: this.props.packageArgs,
            logged: auth.getAuthStatus(),
            cards: [],
            gridTemplate: "section-secondary-usual-grid",
            notify: false
        }
    }

    appTrigger = (message) =>{
        this.props.appTrigger(message)
      }
   
  async listProducts(){
    if(this._isMounted){
        const cards = await getProducts.getProductsObj(this.state.packageArgs.packetid);
        this.setState({ cards });
    }
  }
  
  async componentDidMount(){
    this._isMounted = true;
    if(this.state.packageArgs.packetid === undefined){
        this.state.packageArgs.packetid = null;
    }
    await this.listProducts();
    if(this.state.cards.length >= 6){
        if(this._isMounted) this.setState({gridTemplate: "section-secondary-usual-grid"})
    }else{  
        if(this._isMounted) this.setState({gridTemplate: "section-secondary-dedicated-grid"})
    }
  }


  async componentDidUpdate(prevProps){
    if(prevProps.packageArgs !== this.props.packageArgs){
        
        if(this._isMounted) this.setState({packageArgs: this.props.packageArgs})
    }
    if(this.state.packageArgs.packetid === undefined){
        this.state.packageArgs.packetid = null;
    }else if(this.state.cards.length === 0){
        await this.listProducts();

    }

    if(this.state.notify){
        setTimeout(() => {if(this._isMounted) this.setState({notify: false})},1000);
    }
  }

  componentWillUnmount(){
      this._isMounted=false;
  }

  setNotify = (message) => {
      if(this._isMounted){
        this.setState({message});
        this.setState({notify: true});
        }
  }


  showNotify = () =>{
    return(
      <div className="notifications">
        <Notification message={this.state.message} />
      </div>
    )
  }

  emptyCallback = (x) => {
      //pass
  }


  render(){
    
    return(

      <div className="body-pro">
         <img className="logo logo-pro" src={logo} alt=""/>
          <section className="section-primary section-primary-pro">
			<div className="container container-background">
				<header className="section-header">
					<h1>{this.state.packageArgs.title}</h1>
					<p>{this.state.packageArgs.description1} , već od <strong className="text-gradient">{this.state.packageArgs.minprice}&euro;/{this.state.packageArgs.pricedescription==="year"?"g":"m"}</strong></p>
				</header>
			</div>
		</section>
        <section className={`section-secondary-pro ${this.state.gridTemplate}`}>
			
            {listCards(this.state.cards, "products", this.emptyCallback, this.setNotify, this.appTrigger)}


            
		</section>
        <div className="section-footer-pro">
					<p>Our managed hosting products enforce a fair use policy towards processing, memory and network usage to ensure the best product quality for every customer.</p>
		</div>

        <div className="container">
        <div className="flex flex-pro">
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec1} alt=""/>
                                <h3 className="pcg-h3">High <br/>Performance</h3>
                            </div>
                            <p className="black">We operate one of the most advanced server networks in the world, complete with Anycast support and extensive DDoS protection.</p>
                            
                        </div>
                        
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec3} alt=""/>
                                <h3 className="pcg-h3">Secure <br/>Infrastructure</h3>
                            </div>
                                <p className="black">All datacenters are Tier certified and provide advanced fire and intrusion protection combined with enterprise hardware.</p>

                        </div>
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec2} alt=""/>
                                <h3 className="pcg-h3">Fully <br/>Redundant</h3>
                            </div>
                            <p className="black">Our cloud platform offers a 99.99% uptime guarantee with full hardware and network redundancy to keep your services online.</p>
                            
                        </div>
                    </div>

                    <div className="flex flex-pro">
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec4} alt=""/>
                                <h3 className="pcg-h3">High <br/>Performance</h3>
                            </div>
                            <p className="black">We operate one of the most advanced server networks in the world, complete with Anycast support and extensive DDoS protection.</p>
                            
                        </div>
                        
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec5} alt=""/>
                                <h3 className="pcg-h3">Secure <br/>Infrastructure</h3>
                            </div>
                                <p className="black">All datacenters are Tier certified and provide advanced fire and intrusion protection combined with enterprise hardware.</p>

                        </div>
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec6} alt=""/>
                                <h3 className="pcg-h3">Fully <br/>Redundant</h3>
                            </div>
                            <p className="black">Our cloud platform offers a 99.99% uptime guarantee with full hardware and network redundancy to keep your services online.</p>
                            
                        </div>
                    </div>
                    </div>

        {this.state.notify?this.showNotify():""}  


        <Footer></Footer>


      </div>

    );
  }
}

export default PackagePageHelper;