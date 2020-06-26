import React from 'react';
import getProducts from '../services/getProducts.js';

import '../styles/PackagePageHelper.css';
import logo from '../slike/logo.svg';

class PackagePageHelper extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            package: props.packageArgs,
            cards: [],
            gridTemplate: "section-secondary-usual-grid"
        }
        if(Object.keys(this.state.package).length === 0){
            window.location.href = "/home";
        } 
    }

    listCards = () => {
        return this.state.cards.map((elem, index) =>{
            let priceType = elem.pricedescription;
            let priceHolder;
            if(priceType === "year"){
                let price1, price2, price3 = "";
                if(elem.price3 != null){
                    price1 = <>
					    <strong>1god </strong>
					    <span className="price price-large">{elem.price3}&euro;/g</span><br/>
                    </>
                }
                if(elem.price2 != null){
                    price2 = <>
					    <strong>2god </strong>
					    <span className="price price-large">{elem.price2}&euro;/g</span><br/>

                    </>
                }
                if(elem.price1 != null){
                    price3 = <>
					    <strong>3god </strong>
					    <span className="price price-large">{elem.price1}&euro;/g</span><br/>

                    </>
                }

                priceHolder =   <p className="price-pro">
                                
                                    <span className="hr-pro-up"></span>        
                                    {price1} 
                                    {price2} 
                                    {price3}

                               </p>
            }else{
                priceHolder = <p className="price-pro"> 
                                    <>

                                            <span className="hr-pro-up"></span>
                                            <span className="price price-large">{elem.price1}&euro;</span><br/>
                                            <strong>/ {elem.pricedescription==="year"?"Godišnje":"Mjesečno"}</strong>
                                    </>
            	                </p>
            }

            
        
            return (
                
            
            <div className="container-pro" key={index}>
            <div className="box-pro">
							<h3 className="box-header-pro">{elem.productname}</h3>
                            <div className="box-content-pro">
								{priceHolder}
								<ul className="ul-style-none list-pro">
									<li> {elem.description1} </li>
									<li>{elem.description2}</li>
									<li>{elem.description3}</li>
								</ul>
                                <div className="hr-pro hr-pro-bottom"></div>
							</div>
                            <button className="to-cart-btn">Dodaj u korpu</button>
                        </div>
				
			</div>
                
           
            );
        })
            
    }
  
  async listProducts(){
    const cards = await getProducts.getProductsObj(this.state.package.packetid);
    this.setState({ cards });
    console.log(cards);
    

  }
  
  async componentDidMount(){
    
    await this.listProducts();
    if(this.state.cards.length >= 6){
        this.setState({gridTemplate: "section-secondary-usual-grid"})
        console.log("if ", this.state.gridTemplate);
    }else{  
        this.setState({gridTemplate: "section-secondary-dedicated-grid"})
        console.log("else ", this.state.gridTemplate);
    }
  }


  render(){
    
    return(

      <div className="body-pro">
         <img className="logo logo-pro" src={logo} alt=""/>
          <section className="section-primary section-primary-pro">
			<div className="container container-background">
				<header className="section-header">
					<h1>{this.state.package.title}</h1>
					<p>{this.state.package.description1} , već od <strong className="text-gradient">{this.state.package.minprice}&euro;/{this.state.package.pricedescription==="year"?"g":"m"}</strong></p>
				</header>
			</div>
		</section>
        <section className={`section-secondary-pro ${this.state.gridTemplate}`}>
			
            {this.listCards()}


            
		</section>
        <div className="section-footer-pro">
					<p>Our managed hosting products enforce a fair use policy towards processing, memory and network usage to ensure the best product quality for every customer.</p>
		</div>

        

      </div>

    );
  }
}

export default PackagePageHelper;