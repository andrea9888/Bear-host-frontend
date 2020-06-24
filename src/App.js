import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "./AppResponsive.css";
import { Home } from "./components/Home";
import { Shop } from "./components/Shop";
import Login from "./components/Login";
import { PrivateRoute } from "./auth_and_private/ProtectedRoute.js";
import { Vps } from "./components/Vps";
import { Shared } from "./components/Shared";
import { Dedicated } from "./components/Dedicated";
import { MeCloud } from "./components/MeCloud.js";
import { About } from "./components/About";
import PackagesTel from "./components/NavbarPackagesTel";
import PackagesDes from "./components/NavbarPackagesDes";
import { auth } from "./auth_and_private/authService";
import { Company } from "./components/Company";
class App extends React.Component {
  state = {
    logged: auth.getAuthStatus(),
    isMobile: window.innerWidth < 800,
    loginPage: ""
  };
  toggleLog = (logged) => {
    this.setState({ logged });
    if (logged) {
      this.setState({ logged });
    } else {
      auth.logout();
    }
  };

  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({
        isMobile: window.innerWidth < 800,
      })
    );
  }

  hideNav = () =>{
    this.setState({loginPage: "hidden"})
  }

  togglePageStatus = () => {
    this.setState({loginPage: ""})    
  }

  render() {
    let mobile = this.state.isMobile;

    let navPosition = mobile ? "uk-navbar-right" : "uk-navbar-center";
    let navBar = mobile ? "uk-offcanvas-bar" : "uk-navbar-nav";
    let showToogle = mobile ? "" : "no";
    let offCanvas = mobile ? "offcanvas-usage" : "oncanvas-usage";
    let bool = mobile ? "true" : "false";

    let navGen = mobile ? "" : "links uk-navbar-nav";
    return (
      <div className="App">
        <BrowserRouter>
        <nav  className={`uk-navbar uk-navbar-container uk-margin ${this.state.loginPage}`} uk-navbar="mode: hover">
        <div  className={navPosition}>
          
          <button  className={`uk-button uk-button-default remove-border ${showToogle}`} type="button" uk-toggle="target: #offcanvas-usage">
          <Link className={`uk-navbar-toggle toogle-color" ${showToogle}`} uk-navbar-toggle-icon={bool} to="#"></Link>
          </button>

          <div id={offCanvas} uk-offcanvas={bool}>
              <div  className={navBar}>

                <button  className={`uk-offcanvas-close  ${showToogle}`} type="button" uk-close="true"></button>
                <ul className={navGen}>
                  <li className="list-mem"><Link to="/">Početna</Link></li>
                  
                  
                  {this.state.isMobile?<PackagesTel pack={this.state.isMobile}></PackagesTel>:<PackagesDes pack={this.state.isMobile}></PackagesDes>}
                  <li className="list-mem"><Link to="/company">Kompanija</Link></li>
                  <li className="list-mem"><Link to="/about">O nama</Link></li>
                  <li className="list-mem"><Link to="/shop">Korpa</Link></li>
                  
                    <div className="login-button">
                      {!this.state.logged?<button className="uk-button uk-button-default login"><Link to="/login" className="white">Prijavi se</Link></button>:<button className="uk-button uk-button-default logout white" onClick={()=>this.toggleLog(false)}>Odjavi se</button>}
                    </div>
                  

                </ul>
              </div>
          </div>
      </div>
    </nav> 
          <Switch>
            <Route exact path="(/|/home)" component={Home}></Route>
            <Route path="/vps" component={Vps}></Route>
            <Route path="/shared" component={Shared}></Route>
            <Route path="/dedicated" component={Dedicated}></Route>
            <Route path="/mecloud" component={MeCloud}></Route>
            <Route path="/company" component={Company}></Route>
            <Route path="/about" component={About}></Route>
            <Route
              path="/login"
              render={() => <Login updateLogStatus={this.toggleLog} updatePageStatus={this.togglePageStatus}  hideBRouter={this.hideNav}></Login>}
            ></Route>
            <PrivateRoute component={Shop} path="/shop"></PrivateRoute>
            <Route path="/shop" component={Shop}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;