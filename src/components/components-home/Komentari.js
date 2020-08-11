import React, { Component } from 'react';
import apiCall from '../../services/apiCall';
import '../../styles/komentari.css'
class Komentari extends Component {
    state = { 
        comments : []
     }
     async componentDidMount(){
        const response = await apiCall.get('/comments');
        if(response){
        const comments = response.data;
        this.setState({comments}) ;
        }
     }
    displayComments = ()=>{
        let komentari = this.state.comments.slice(0,3);
        return komentari.map((elem, index) =>{
            return(
                <div className="flex-33" key={index}>
                    <div className="box">
                        <div className="box-label box-label-center">
                            <span uk-icon="icon: star" ></span>
                            <span uk-icon="icon: star"></span>
                            <span uk-icon="icon: star"></span>
                            <span uk-icon="icon: star"></span>
                            <span uk-icon="icon: star"></span>
                        </div>
                        <div className="box-content">
                            <p className="kom">{elem.comment}</p>
                            <p className="kom-author">
                                <a href="#twitter"><span className="uk-icon-button uk-margin-small-right" uk-icon="twitter"></span>{elem.name}</a><br/>
                                <small>{elem.job}</small>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        )
    }
     
    render() { 
        return ( 
            <section className="section-secondary">
			<div className="container">
				<header className="section-header">
					<h2>What Our Customers Say</h2>
					<p>We've helped thousands of clients with our professional, custom server solutions, enabling them to operate much more efficiently and securely than they ever did before.</p>
				</header>
            <div className="flex flex-center-bottom">{this.displayComments()}</div>
            </div>
            </section>
         );
    }
}
 
export default Komentari;