import React, { Component } from 'react';
import '../styles/contact.css';
import apiCall from '../services/apiCall';
import {Notification} from '../components/Notifications.js';
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: '',
            emailValue:'',
            subjValue:'',
            messageValue:''
        };
    
        
      }
      componentDidUpdate(){
        if(this.state.notify){
          setTimeout(() => {this.setState({notify: false})},5000);
        }
      }
    
      setNotify = (message) => {
        this.setState({message});
        this.setState({notify: true});
      }
    
    
      showNotify = () =>{
        return(
          <div className="notifications">
            <Notification message={this.state.message} />
          </div>
        )
      }
    handleNameChange = (event)=> {
        this.setState({nameValue: event.target.value});
      }
      handleEmailChange = (event)=> {
        this.setState({emailValue: event.target.value});
      }
      handleSubjChange = (event)=> {
        this.setState({subjValue: event.target.value});
      }
      handleMessageChange = (event)=> {
        this.setState({messageValue: event.target.value});
      }
    
    sendMessage = async () => {
        
        const response = await apiCall.post('/contact',{
            name: this.state.nameValue,
            email: this.state.emailValue,
            subject: this.state.subjValue,
            message: this.state.messageValue
        })
        const odg = response.data;
        if(response.status===400){
            this.setNotify("Došlo je do greške.");
        }
        else{
            this.setNotify("Uspješno poslata poruka.");
        }
        

        console.log(odg);
    }
        
        
    
    render() { 
        return ( 
            <div className="contact">
                <div className="blue"></div>
                 
                    <div className="unos">
                        <div className="help">
                        <input type="text" name="full-name" className="input" value={this.state.nameValue} onChange={this.handleNameChange} placeholder="Ime i prezime"/>
                        <input type="email" name="email" className="input" value={this.state.emailValue} onChange={this.handleEmailChange} placeholder="Email adresa"/>
                        <input type="text" name="subject" className="input" value={this.state.subjValue} onChange={this.handleSubjChange} placeholder="Tema"/>
                    
                    
                        <textarea name="poruka-text" value={this.state.messageValue} onChange={this.handleMessageChange}  placeholder="Poruka"/>
                
                    <div className="dugme-div">
                        <button className="uk-button uk-button-deafult dugme"  onClick={this.sendMessage}><span className="blue-color" uk-icon="icon: mail"></span>  Pošalji poruku</button>
                    </div>
               </div>
            </div>
                {this.state.notify?this.showNotify():""} 
         </div>
                
         );
    }
}
 
export default Contact;