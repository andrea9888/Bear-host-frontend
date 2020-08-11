import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "./AppResponsive.css";
import { Home } from "./components/Home";
import  Shop from "./components/Shop";
import Login from "./components/Login";
import { PrivateRoute } from "./auth_and_private/ProtectedRoute.js";
import  Vps  from "./components/Vps";
import  Shared  from "./components/Shared";
import  Dedicated  from "./components/Dedicated";
import  MeCloud  from "./components/MeCloud.js";
import PackagesTel from "./components/NavbarPackagesTel";
import PackagesDes from "./components/NavbarPackagesDes";
import { auth } from "./auth_and_private/authService";
import { Company } from "./components/Company";
import Kontakt from './components/Contact';
import apiCall from "./services/apiCall";
import getCartProducts from './services/getCartProducts.js';

class App extends React.Component {
  state = {
    logged: auth.getAuthStatus(),
    isMobile: window.innerWidth < 800,
    loginPage: "",
    products: [],
    packets: {},
    cartLen: 0

  };

  // async componentWillUnmount(){
  //   await auth.logout();
  // }

  setCartLenTrigger = (message) => {
    this.setState( {cartLen: message} );
  }


  toggleLog = (logged) => {
    this.setState({ logged });
    if (logged) {
      this.setState({ logged });
    } else {
      auth.logout(true);
    }
  };

  async componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({
        isMobile: window.innerWidth < 800,
      })
    );
    if (this.state.products.length === 0){
      await this.readPackets();
      await this.readProducts();
    }
    if(this.state.logged){
      const cartLen = await getCartProducts.cartLen()
      this.setState({ cartLen });
  }
  }

  hideNav = () =>{
    this.setState({loginPage: "hidden"})
  }

  async componentDidUpdate(){
    if(this.state.cartLen === "default"){
      const cartLen = await getCartProducts.cartLen();
      this.setState({cartLen});
    }
  }

  togglePageStatus = () => {
    this.setState({loginPage: ""})    
  }
  async readProducts() {
    
      const response = await apiCall.get('/products/marketing');
      if(response){
      const products = response.data;
      this.setState({products}) ;
    }
  }



  async readPackets(){
    const response = await apiCall.get('/products/packets');
    var packets = {};
    if(response){
    for(const element of response.data){
      packets[element.packetname] = element.packetid;
    }
    this.setState({ packets });}
  }

  objectForProducts(id){
    var objToSend = {};
    for(const element of this.state.products){
        if(id === element.id){
          objToSend.title = element.title;
          objToSend.description1 = element.description1;
          objToSend.minprice = element.minprice;
          objToSend.pricedescription = element.pricedescription;
          objToSend.packetid = element.id;
        return objToSend;
      }
    }
    return objToSend;
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
                  
                  {this.state.isMobile?<PackagesTel pack={this.state.isMobile}></PackagesTel>:<PackagesDes pack={this.state.isMobile} ></PackagesDes>}
                  <li className="list-mem"><Link to="/company">Kompanija</Link></li>
                  <li className="list-mem"><Link to="/contact">Kontakt</Link></li>
    <li className="list-mem"><Link to="/shop" className="cart-icon-li"><span uk-icon="cart"></span> {this.state.logged?<span className="cart-len">{this.state.cartLen}</span>:""}</Link></li>
                  
                    <div className="login-button">
                      {!this.state.logged?<button className="uk-button uk-button-default login"><Link to="/login" className="white">Prijavi se</Link></button>:<button className="uk-button uk-button-default logout white" onClick={()=>this.toggleLog(false)}>Odjavi se</button>}
                    </div>
                  

                </ul>
              </div>
          </div>
      </div>
    </nav> 
          <Switch>
            <Route exact path="(/|/home)" render={()=><Home products={this.state.products}></Home>}></Route>
            <Route path="/vps" render={()=><Vps products={this.objectForProducts(this.state.packets["VPS"])} appTrigger={this.setCartLenTrigger}></Vps>}></Route>
            <Route path="/shared" render={()=><Shared products={this.objectForProducts(this.state.packets["Shared"]) } appTrigger={this.setCartLenTrigger}></Shared>}></Route>
            <Route path="/dedicated" render={()=><Dedicated products={this.objectForProducts(this.state.packets["Dedicated"])} appTrigger={this.setCartLenTrigger}></Dedicated>} ></Route>
            <Route path="/mecloud" render={()=><MeCloud products={this.objectForProducts(this.state.packets["Cloud"]) } appTrigger={this.setCartLenTrigger}></MeCloud>}></Route>
            <Route path="/company" component={Company}></Route>
            <Route path="/contact" component={Kontakt}></Route>
            <Route path="/setings/" component={Kontakt}></Route>
            <Route
              path="/login"
              render={() => <Login updateLogStatus={this.toggleLog} updatePageStatus={this.togglePageStatus}  hideBRouter={this.hideNav}></Login>}
            ></Route>
            <PrivateRoute component={Shop} appTrigger={this.setCartLenTrigger}  path="/shop" ></PrivateRoute>
            <Route path="/shop" component={Shop}></Route>
            <Route path="*" render={()=><h1 style={{color:"black"}}>NOT FOUND!!!</h1>}></Route>
          
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
