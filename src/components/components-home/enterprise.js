import React, { Component } from 'react';
import '../../styles/enterprise.css';

import mapa from '../../slike/mapa.svg';
import sec1 from '../../slike/K1.svg';
import sec2 from '../../slike/K2.svg';
import sec3 from '../../slike/K3.svg';

class Enterprise extends Component {
    state = {  }
    render() { 
        return (
            <section className="section-secondary">
                
                <div className="container">
                    <header className="section-header">
                        
                        <h2>Enterprise Cloud Platform</h2>
                        <p>Deploy your service infrastructure on our fully redundant, high performance cloud platform and benefit from its reliability, security, resilience and enterprise feature set.</p>
                    </header>
                    <div className="flex">
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec1} alt=""/>
                                <h3>High <br/>Performance</h3>
                            </div>
                            <p>We operate one of the most advanced server networks in the world, complete with Anycast support and extensive DDoS protection.</p>
                            
                        </div>
                        
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec3} alt=""/>
                                <h3>Secure <br/>Infrastructure</h3>
                            </div>
                                <p>All datacenters are Tier certified and provide advanced fire and intrusion protection combined with enterprise hardware.</p>

                        </div>
                        <div className="flex-33">
                            <div className="enterprise">
                                <img className="fas fa-gradient fa-left" src={sec2} alt=""/>
                                <h3>Fully <br/>Redundant</h3>
                            </div>
                            <p>Our cloud platform offers a 99.99% uptime guarantee with full hardware and network redundancy to keep your services online.</p>
                            
                        </div>
                    </div>
                    <div className="map">
                        <ul>
                    
                            <li className="podgorica"><a href="network.html"><div className="map-label-top">Podgorica <small>Crna Gora</small></div></a></li>
                            <li className="pariz"><a href="network.html"><div className="map-label-top">Pariz <small>Francuska</small></div></a></li>
                            <li className="amsterdam"><a href="network.html"><div className="map-label-top">Amsterdam <small>Holandija</small></div></a></li>                           
                        </ul>
                        <img width="1276" height="630" src={mapa} alt=""/>
                            
                    </div>
                    <footer className="section-footer">
                        <p>Deploy your services on one of the most advanced networks worldwide, complete with Anycast support, optimized routing and enterprise DDoS protection.</p>
                    </footer>
                </div>
            </section>
          );
    }
}
 
export default Enterprise;