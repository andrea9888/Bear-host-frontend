import React from 'react';
import apiCall from '../services/apiCall.js';
import '../styles/Order.css';
import getCartProducts from '../services/getCartProducts.js';
import { data } from 'jquery';

class Order extends React.Component {
    constructor(props) {
    window.scrollTo(0, 0);
      super(props);
      let dataForSending = {};
      let dataForListing = []
        this.props.products.forEach(elem => {
            dataForSending[elem.productid] = [{1: true, 2: false, 3: false}, {1: elem.price1, 2: elem.price2, 3: elem.price3}]
            dataForListing.push({ productid: elem.productid, title: elem.productname, price1: elem.price1, price2: elem.price2, price3: elem.price3, desc: elem.pricedescription==="year"?"g":"m"})
       }) 
      this.state = {
        dataToSend: dataForSending,
        dataToList: dataForListing 
    };
    }

    orderCall = async () => {
        let data = {"products": []};
        let help = {"productid": undefined, "pricepacket": undefined};
        const dataHelp = this.state.dataToSend;
        for(const elem in dataHelp){
            help.productid = parseInt(elem);
            if(dataHelp[elem][0][1]) help.pricepacket = 1;  
            if(dataHelp[elem][0][2]) help.pricepacket = 2;  
            if(dataHelp[elem][0][3]) help.pricepacket = 3;  
            data.products.push(help);
        }
        const res = await apiCall.post('/order', data)
        
        if (res.status === 400){
           this.props.notify("Došlo je do grepške! Pokušajte ponovo!");
        }else{
            this.props.notify("Uspješno! Admin će vam odgovoriti mailom.");
        }
        getCartProducts.setForce(false);
        this.props.setTriger("order");
        this.props.close();
    }

    changeData = (id, num) => {
        let dataHelp = this.state.dataToSend;
        for(const elem in dataHelp){
            if(elem === id){
              if(dataHelp[elem][0][num]) break;  
              dataHelp[elem][0][num] = true;
              if(num !== 1) dataHelp[elem][0][1] = false;
              if(num !== 2) dataHelp[elem][0][2] = false;
              if(num !== 3) dataHelp[elem][0][3] = false;  
              break;
            }
        }
        this.setState({ dataToSend: dataHelp });
    }

    listProducts = () => {
        return this.state.dataToList.map((elem, index) =>{
            let priceHolder;
            
            if(elem.desc === "g"){
                let price1, price2, price3 = "";
                let radio1, radio2, radio3 = "";
                if(elem.price3 != null){
                    price1 = <label htmlFor={`${elem.productid}One`}>
                        <strong>1god </strong>
                        <span className="price-modal">{elem.price1}&euro;/g</span><br/>
                    </label>
                    radio1 = <input type="radio" id={`${elem.productid}One`} name={elem.productid} value="1" checked={this.state.dataToSend[elem.productid][0][1]} onChange={(e) => this.changeData(e.target.name, 1)}/>

                }
                if(elem.price2 != null){
                    price2 = <label htmlFor={`${elem.productid}Two`}>
                        <strong>2god </strong>
                        <span className="price-modal">{elem.price2}&euro;/g</span><br/>
    
                    </label>
                     radio2 = <input type="radio" id={`${elem.productid}Two`} name={elem.productid} value="2" onChange={(e) => this.changeData(e.target.name, 2)} checked={this.state.dataToSend[elem.productid][0][2]}/>
}
                if(elem.price1 != null){
                    price3 = <label htmlFor={`${elem.productid}Three`}>
                        <strong>3god </strong>
                        <span className="price-modal">{elem.price3}&euro;/g</span><br/>
                    </label>
                    radio3 = <input type="radio" id={`${elem.productid}Three`} name={elem.productid} value="3" onChange={(e) => this.changeData(e.target.name, 3)} checked={this.state.dataToSend[elem.productid][0][3]}/>
                }

                priceHolder =   <p className="price-modal">     
                                        {radio1}{price1} 
                                        {radio2}{price2} 
                                        {radio3}{price3}
                                
                               </p>
            }else{
                priceHolder = <p className="price-modal"> 
                                    <>

                                            <span className="price-modal">{elem.price1}&euro;/m</span><br/>
                                    </>
                                </p>
            }
            return (
                        
            <div className="modal-container" key={index}> 
                <div className="box-modal">
                            <h3 className="box-header-modal">{elem.title}</h3>
                            <div className="box-content-modal">
                                {priceHolder}
                            </div>
                </div>
                
            </div>
                
           
            );
        })
            
    }

    calcPrice(){
        const dataHelp = this.state.dataToSend;
        let price = 0;
        for(const elem in dataHelp){
            if(dataHelp[elem][0][1] === true) price += dataHelp[elem][1][1];  
            if(dataHelp[elem][0][2] === true) price += dataHelp[elem][1][2];  
            if(dataHelp[elem][0][3] === true) price += dataHelp[elem][1][3]; 
        }
        return price;
    }


    render(){
        return(
            <div className="modal-window">
                <div className="modal-table">
                    {this.listProducts()}
                </div>
                <div className="btn-and-price">
                    <div className="modal-text">UKUPNO <strong>{this.calcPrice()}&euro;</strong></div>
                    <button className="to-cart-btn order-btn-modal" onClick={this.orderCall}>PORUČI</button>
                </div>
                <button className="close-modal-table" onClick={this.props.close}><span uk-icon="icon:close"></span></button>
                
            </div>
        );
    }
}

export default Order;