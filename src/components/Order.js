import React from 'react';
import '../styles/Order.css';
import { data } from 'jquery';

class Order extends React.Component {
    constructor(props) {
      super(props);
      let dataForSending = [];
      let dataForListing = []
        this.props.products.forEach(elem => {
            dataForSending.push({ [elem.productid]: {1: true, 2: false, 3: false}})
            dataForListing.push({ productid: elem.productid, title: elem.productname, price1: elem.price1, price2: elem.price2, price3: elem.price3, desc: elem.pricedescription==="year"?"g":"m"})
       }) 
      this.state = {
        dataToSend: dataForSending,
        dataToList: dataForListing 
    };
    }

    changeData = (id, num) => {
        let dataHelp = this.state.dataToSend;
        console.log("state -- ", dataHelp);
        for(var elem of dataHelp){
            let key = Object.keys(elem)[0];
            
            if(key === id){
              if(elem[key][num]) break;  
              elem[key][num] = true;
              if(num !== 1) elem[key][1] = false;
              if(num !== 2) elem[key][2] = false;
              if(num !== 3) elem[key][3] = false;  
              break;
            }
        }
        console.log(dataHelp);
        this.setState({ dataToSend: dataHelp });
    }

    listProducts = () => {
        return this.state.dataToList.map((elem, index) =>{
            let priceHolder;
            if(elem.desc === "g"){
                let price1, price2, price3 = "";
                let radio1, radio2, radio3 = "";
                if(elem.price3 != null){
                    price1 = <>
                        <strong>1god </strong>
                        <span className="price-modal">{elem.price3}&euro;/g</span><br/>
                    </>
                    radio1 = <input type="radio" name={elem.productid} value={`1 ${elem.price3}`} checked={this.state.dataToSend[elem.productid[1]]} onChange={(e) => this.changeData(e.target.name, 1)}/>

                }
                if(elem.price2 != null){
                    price2 = <>
                        <strong>2god </strong>
                        <span className="price-modal">{elem.price2}&euro;/g</span><br/>
    
                    </>
                     radio2 = <input type="radio" name={elem.productid} value={`2 ${elem.price2}`} onChange={(e) => this.changeData(e.target.name, 2)} checked={this.state.dataToSend[elem.productid[2]]}/>
}
                if(elem.price1 != null){
                    price3 = <>
                        <strong>3god </strong>
                        <span className="price-modal">{elem.price1}&euro;/g</span><br/>
    
                    </>
                    radio3 = <input type="radio" name={elem.productid} value={`3 ${elem.price1}`} onChange={(e) => this.changeData(e.target.name, 3)} checked={this.state.dataToSend[elem.productid[3]]}/>
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


    render(){
        return(
            <div className="modal-window">
                {this.listProducts()}
            </div>
        );
    }
}

export default Order;