import React from 'react';
import  PackagePageHelper  from './PackagePageHelper.js';
 
class Shared extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data: this.props.products
    }
  }


  componentDidUpdate(){

    if(this.props.products !== this.state.data){
      this.setState({data: this.props.products})
    }
  }

  render(){
    return(

      <PackagePageHelper packageArgs={this.state.data} appTrigger={this.props.appTrigger}/>
      
    );
  }
}

export default Shared;