import React from 'react';
import  PackagePageHelper  from './PackagePageHelper.js';
 
class Vps extends React.Component{
  state={
  }

  render(){
    return(

      <PackagePageHelper packageArgs={this.props.products}/>
      
    );
  }
}

export default Vps;