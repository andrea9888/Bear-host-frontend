import React from 'react';
import getProducts from '../services/getProducts.js';

class Vps extends React.Component{
  state={

  }
  async listProducts(){
    let res = await getProducts.getProductsObj("1");
    console.log(res);
  }
  
  componentDidMount(){
    this.listProducts();
  }

  render(){
    return(

      <div>

      </div>

    );
  }
}

export default Vps;