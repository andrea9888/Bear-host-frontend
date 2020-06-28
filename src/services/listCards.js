import React from 'react';
import apiCall from './apiCall.js';
import getCartProducts from '../services/getCartProducts.js';

async function addToCart(id, notifyFunc){
    let res = await apiCall.put("/cart", {
        "productid": id});
        getCartProducts.setForce(false);
        if(res.status === 200){
            notifyFunc("Uspješno sačuvano!")
        }else if(res.status === 400){
            notifyFunc("Proizvod već postoji u vašoj korpi!")
        }else{
            notifyFunc("Došlo je do greške!")
        }
    }

async function deleteFromCart(id, notifyFunc){
    let res = await apiCall.delete(`/cart/${id}`);
    if(res.status === 200){
        notifyFunc("Uspješno obrisano!")
    }else{
        notifyFunc("Došlo je do greške!")
    }
    getCartProducts.setForce(false);

}
export default function listCards(obj, parent, trigerFunc, notifyFunc){

    return obj.map((elem, index) =>{
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
                        {parent==="products"?<button className="to-cart-btn" onClick={() => {
                            addToCart(elem.id, notifyFunc)
                        }}>Dodaj u korpu</button>:<button className="to-cart-btn delete-product" id={elem.productid} onClick={async (e) => {
                            const id = e.target.id;
                            await deleteFromCart(id, notifyFunc);
                            trigerFunc(id);
                            }}>Obrisi</button>}
                    </div>
            
        </div>
            
       
        );
    })
        
}
