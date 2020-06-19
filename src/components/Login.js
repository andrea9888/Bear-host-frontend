import React from "react";
import { withRouter } from "react-router-dom";
import '../styles/Login.css';
import SignIn from "./login_forms/SignIn.js";
import SignUp from "./login_forms/SignUp.js";

class LoginClass extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      component: true,
      btnClass: "sign-up"
    };
  }

  toggleComponent= () =>{
    this.setState({component: false})
    this.setState({btnClass: "hidden"})

  }

  componentWillUnmount(){
    this.props.updatePageStatus();
  }

  componentWillMount(){
    this.props.hideBRouter();
  }

  render(){
    return (
      <div className="body">
      <div className="text">
      </div>
      <div className="form-container">
      {this.state.component?<SignIn updateLogStatus={this.props.updateLogStatus} history={this.props.history}/>:<SignUp updateLogStatus={this.props.updateLogStatus} history={this.props.history}/>}     
      </div>
      <div className={this.state.btnClass}>
        <p>NEMATE NALOG?</p>
        <button onClick={this.toggleComponent}>REGISTRUJ SE</button>
      </div>
      </div>
    );
  }
};

/*
{this.state.component?<SignIn updateLogStatus={this.props.updateLogStatus} history={this.props.history}/>:<SignUp updateLogStatus={this.props.updateLogStatus} history={this.props.history}/>}
*/

const Login = withRouter(LoginClass);
export default Login;
