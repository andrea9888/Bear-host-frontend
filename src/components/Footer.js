import React from 'react';
import { Link } from "react-router-dom";
import '../styles/footer.css'
const Footer = () => {
    return ( 
        <section id="footer">
			<div className="container text-secondary link-primary">
				<nav className="flex flex-center-top">
					<div>
						<h4>CONNECT</h4>
						<ul>

							<li><Link to="#"><span to="" className="uk-icon-button uk-margin-small-right" uk-icon="twitter"></span>Twitter</Link></li>
							<li><Link to="#"><span to="" className="uk-icon-button uk-margin-small-right" uk-icon="github"></span>GitHub</Link></li>
							<li><Link to="#"><span to="" className="uk-icon-button uk-margin-small-right" uk-icon="facebook"></span>Facebook</Link></li>
						</ul>
					</div>
					<div>
						<h4>PRODUCTS</h4>
						<ul>
							<li><Link to="/shared">Shared Hosting</Link></li>
							<li><Link to="/vps">VPS</Link></li>
							<li><Link to="/dedicated">Dedicated Servers</Link></li>
							<li><Link to="/mecloud">ME Cloud</Link></li>
						</ul>
					</div>
					<div>
						<h4>RESOURCES</h4>
						<ul>
							
							<li><Link to="#">Terms of Service</Link></li>
							<li><Link to="#">Privacy Policy</Link></li>
						</ul>
					</div>
					<div>
						<h4>COMPANY</h4>
						<ul>
							<li><Link to="/company">About us</Link></li>
							<li><Link to="/contact">Contact</Link></li>
						</ul>
					</div>
				</nav>
				<footer className="section-footer">
					<p className="copyright">
						Copyright 2019 &copy; Bearhost Server Solutions. All rights reserved.<br/>
						Powered by HTML5, developed by <Link to="https://serifly.com">Serifly</Link>
					</p>
				</footer>
			</div>
		</section>
     );
}
 
export default Footer;