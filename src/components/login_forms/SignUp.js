import React from "react";
import { auth } from "../../auth_and_private/authService.js";


class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      //this.handleChange = this.handleChange.bind(this);
      this.state = {
        usernameHolderStr: "",
        passHolderStr: "",
        wrongUsername: false,
        wrongPass: false
      };
    }
    
    
    usernameHolder = (usernameHolderStr) => {
    this.setState({ usernameHolderStr });
    }
    passHolder = (passHolderStr) => {
      this.setState({ passHolderStr });
      }
  
    handlePass = (pass) => {
      if(pass.match(/[a-z]/ ) && pass.match(/[A-Z]/) && pass.match(/[0-9]/) && pass.length >= 8){
          return true;
      }
      this.setState({ wrongPass: true});
      return false;
  
    }
  
    handleUsername = () => {
      if(this.state.usernameHolderStr.length >= 3){
          return true;
      }
      this.setState({ wrongUsername: true});
      return false;
    }
  
    async loginCall(data){
      var res = await auth.login(data);
      if(res === "error"){
        this.setState({ usernameHolderStr: ""});
        this.setState({ passHolderStr: ""});
      }else{
        localStorage.setItem('bear-host-access', res.accesToken);      
        localStorage.setItem('bear-host-refresh', res.refreshToken);
        this.props.updateLogStatus(true);
        this.props.history.push("/");
      }
  
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      var data = {
        'username': this.state.usernameHolderStr,
        'password': this.state.passHolderStr
      }
      if(this.handleUsername(data.username) && this.handlePass(data.password)){
        this.loginCall(data); 
      }else{
        console.log("nesto je pogresno");
      }
  
  
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="sign-in">
                <h2>SIGN UP</h2>
                <input type="text" placeholder="Username" className="input-shape" name="username" onChange={e =>  this.usernameHolder(e.target.value)} value={this.state.usernameHolderStr}/>
                <input type="password" placeholder="Password" className="input-shape" name="password" onChange={e =>  this.passHolder(e.target.value)} value={this.state.passHolderStr}/>
                <div className="section-bellow">
                <div className="section-checkbox">
                <input type="checkbox" name="keep" id="keep" className="keep-checkbtn"/>
                <label htmlFor="keep" className="keep-label">Keep me logged in</label>
                </div>
                <a href="" /*AwdaAAAAAAAAAAAA*/>Forgot Password?</a>
                </div>
                <button type="submit" className="signin-btn" >SIGN IN</button>
            </form>



        );
    }

}

export default SignUp;