import React from "react";
import { Link } from "react-router-dom";
import './style.scss';
class TopNav extends React.Component{
    constructor(){
        super();
        this.myRef = React.createRef();
        this.state = {
          off: "hidden",
          dropdown: "pi pi-angle-down",
          navigationOff: "hiddenMainNav",
          navIcon: "pi pi-align-right",
          themeContent: "Dark",
          themeIcon: "pi pi-sun",
          selectedLanguage: "en",
          languages: [
            {name: "en"}, {name: "bn"} 
          ],
          themeState: false,
        }
    }
    navigationController = ()=>{
      if(this.state.navigationOff == "hiddenMainNav"){
        this.setState({navigationOff: "showMainNav", off: "hidden", navIcon: "pi pi-times"});
      }if(this.state.navigationOff == "showMainNav"){
        this.setState({navigationOff: "hiddenMainNav", navIcon: "pi pi-align-right"});
      }
    }
    logout = (evt)=>{
      window.location.href="http://localhost:3000/"
      return localStorage.clear();
    }
    render(){
      const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2" />;
        return (
          <div className="mainNavBar">
              <div className="topBar">
                <div className="original-menu">
                  <div className="nav-left">
                    <div className="brand"><li>{start}</li>
                    </div>
                    <div className="menu-end">
                    
                  </div>
                    <div className="menu-middle">
                      <ul>
                      <div className="navigation" onClick={this.navigationController}>
                          <i className={this.state.navIcon}></i>
                      </div>
                        <div className={`${this.state.navigationOff} jewel`} >
                          <li><Link to="/">
                            Home
                          </Link></li>
                          <div className="dropdown-menu">
                          </div>
                          <li><Link  className="p-menubar-item" to="/extends" > Extends</Link></li>
                          <li><Link  className="p-menubar-item" to="/" onClick={this.logout}> Logout</Link></li>
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="menu-endBig">
                    
                  </div>
                </div>
            </div>
            <br />
          </div>
        );
    }
}
export default TopNav;