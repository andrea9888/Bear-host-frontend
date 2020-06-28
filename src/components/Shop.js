import React from 'react';
import Footer from './Footer';
import Order from './Order.js';
import {Notification} from '../components/Notifications.js'
import listCards from '../services/listCards.js'
import getCartProducts from '../services/getCartProducts.js';

import logo from '../slike/logo.svg';
import '../styles/Shop.css';


class Shop extends React.Component{
  _isMounted = false;
  state={
      gridTemplate: "section-secondary-usual-grid",
      cards: [],
      triger: 'triger',
      notify: false,
      modal: false
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

    async listProducts(){
      if(this._isMounted){
        const cards = await getCartProducts.getCartProductsObj();
        this.setState({ cards });
      }
  
    }
    
    async componentDidMount(){
      // if(!auth.getAuthStatus()){
      //   window.history.href="/";
      // }
      this._isMounted = true;
      await this.listProducts();
      if(this.state.cards.length >= 6){
          if(this._isMounted) this.setState({gridTemplate: "section-secondary-usual-grid"})
      }else{  
        if(this._isMounted) this.setState({gridTemplate: "section-secondary-dedicated-grid"})
      }
    }


    componentWillUnmount(){
      this._isMounted=false;
    }

    async componentDidUpdate(prevProps, prevState){
      if(prevState.triger !== this.state.triger){
        await this.listProducts();
      }

      if(this.state.notify){
         setTimeout(() => {if(this._isMounted) this.setState({notify: false})},3000);
        } 

        
  
    }
    triger = ( triger ) => {
      if(this._isMounted) this.setState({ triger });
    }

    setModal = () => { 
      if(this._isMounted) this.setState({ modal: !this.state.modal})
            
    }

  render(){
    return(

      <div className="body-pro">
         <img className="logo logo-pro" src={logo} alt=""/>
          <section className="section-primary section-primary-pro">
			<div className="container container-background">
				<header className="section-header">
					<h1>KORPA</h1>
					<p>Vaši omiljeni proizvodi na jednom mjestu!</p>
				</header>
			</div>

        
		</section>
    
    {this.state.cards.length===0?<h2 className="no-saved-products">Nemate sačuvanih proizvoda.</h2>
    :<><section className={`section-secondary-pro ${this.state.gridTemplate}`}>
        {listCards(this.state.cards, "shop", this.triger, this.setNotify)}
		</section>
    <div className="order"><button className="to-cart-btn order-btn" onClick={this.setModal}>Poruči</button></div></>
    }

    {this.state.notify?this.showNotify():""}  
    

    {this.state.modal?<Order products={this.state.cards} close={this.setModal} notify={this.setNotify} setTriger={this.triger}/>:""}
    {this.state.modal?<div className="mask" onClick={this.setModal}></div>:""}

    <Footer/>
    </div>
      
    );
  }
}

export default Shop;