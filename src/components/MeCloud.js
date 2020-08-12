import React from 'react';
import  PackagePageHelper  from './PackagePageHelper.js';
 
class MeCloud extends React.Component{
  state={
  }

  render(){
    return(

      <PackagePageHelper packageArgs={this.props.products} appTrigger={this.props.appTrigger}/>
      
    );
  }
}

export default MeCloud;