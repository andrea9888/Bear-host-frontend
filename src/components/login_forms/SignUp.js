import React from "react";
import { auth } from "../../auth_and_private/authService.js";


class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      //this.handleChange = this.handleChange.bind(this);
      this.state = {
        email: "",
        username: "",
        name: "",
        lastName: "",
        password: "",
        passwordRep: ""
      };
    }
    
    
    holder = (name, value) => {
      this.setState({ [name]:  value});
    }
  
  
    handleUsername = (username) => {
      if(username.length >= 3){
          return true;
      }
      
      this.props.setNotify("Prekratko korisničko ime!");
      return false;
    }
    
    handlePass = (pass) => {
      if(pass.match(/[a-z]/ ) && pass.match(/[A-Z]/) && pass.match(/[0-9]/) && pass.length >= 8){
        if(this.state.password === this.state.passwordRep){
          return true;
        }
        this.props.setNotify("Lozinke se ne poklapaju!");
        return false;
      }
      this.props.setNotify("Pogrešno unijeta lozinka!");
      return false;
      
    }

    handleEmail = (email) => {
      if(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          return true;
      }
      this.props.setNotify("Pogrešno unijet email!");
      return false;
      
    }

    handleName = (nameF) => {
      if(nameF.length > 0){
          return true;
      }
      this.props.setNotify("Morate unijeti svoje ime!");
      return false;
      
    }

    handleLastName = (name) => {
      if(name.length > 0){
          return true;
      }
      this.props.setNotify("Morate unijeti svoje prezime!");

      return false;
      
    }

    resetState = () =>{
        this.setState({ username: ""});
        this.setState({ password: ""});
        this.setState({ name: ""});
        this.setState({ lastName: ""});
        this.setState({ email: ""});
        this.setState({ passwordRep: ""});
    }

    async loginCall(data){
      var res = await auth.signup(data);
      if(res === "uspjesno"){
        this.props.setNotify("Uspješna registracija! Potvrdite nalog.");
      }else{
        this.props.setNotify(res);
      }
  
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      var data = {
        'username': this.state.username,
        'password': this.state.password,
        'firstname': this.state.name,
        'lastname': this.state.lastName,
        'email': this.state.email
      }/*
      this.handleName(data.firstname) && this.handleLastName(data.lastname) && this.handleEmail(data.email) && this.handleUsername(data.username) && this.handlePass(data.password)
      */
      if(true){
        this.loginCall(data); 
      }
      
  
    }

    closeModal = () =>{
      this.props.setModal();
    }

    render(){
        return(
          <div className="modal">
            <div className="close-modal-container">
                  <button className="close-modal" type="button" onClick={this.closeModal}>X</button>
            </div>
            <form onSubmit={this.handleSubmit} className="sign-up">
              <div className="form-holder">
              <div className="sign-up-section-1">
                <input type="text" placeholder="Ime" className="input-shape input-shape-sign-up" name="name" onChange={e =>  this.holder(e.target.name, e.target.value)} value={this.state.name}/>
                <input type="text" placeholder="Prezime" className="input-shape input-shape-sign-up" name="lastName" onChange={e =>  this.holder(e.target.name, e.target.value)} value={this.state.lastName}/>
                <input type="email" placeholder="Email" className="input-shape input-shape-sign-up" name="email" onChange={e =>  this.holder(e.target.name, e.target.value)} value={this.state.email}/>
                </div>
                <div className="sign-up-section-2">
                <input type="text" placeholder="Korisničko ime" className="input-shape input-shape-sign-up" name="username" onChange={e =>  this.holder(e.target.name, e.target.value)} value={this.state.username}/>
                <input type="password" placeholder="Lozinka" className="input-shape input-shape-sign-up" name="password" onChange={e =>  this.holder(e.target.name,e.target.value)} value={this.state.password}/>
                <input type="password" placeholder="Ponovi lozinku" className="input-shape input-shape-sign-up" name="passwordRep" onChange={e =>  this.holder(e.target.name,e.target.value)} value={this.state.passwordRep}/>    
                </div>
                </div>
                <div className="signup-btns">
                  <button type="submit" className="signup-btn" >Registruj se</button>
                  {/* <div>ILI</div>
                  <button type="button" className="signup-google"></button> */}
                </div>
            </form>
          </div>


        );
    }

}

export default SignUp;