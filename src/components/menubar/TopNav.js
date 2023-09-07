import React from "react";
import { Link } from "react-router-dom";
import './style.scss';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Avatar } from 'primereact/avatar';
import axios from "axios";
import { connect } from "react-redux";
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
          userinfo: {}
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
    componentDidMount(){
      if(localStorage.getItem(`useremail`) != null){

        axios.get(`http://localhost:8888/specificuserinfo?email=${localStorage.getItem(`useremail`)}`).then((response)=> {
            console.log("response is going on", response.data);
            this.setState({userinfo: response.data});
            localStorage.setItem("userid", response.data.userid);
            localStorage.setItem("address", response.data.address);
            localStorage.setItem("mobilenumber", response.data.mobilenumber);
            localStorage.setItem("username", response.data.username);
            
        })
      }
    }
    render(){
      console.log("......................", localStorage.getItem(`useremail`))
      const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2" />;
      const end = 
      <div className="">
        <Avatar
          shape="circle"
          size="large"
          onClick={(e) => this.myRef.current.toggle(e)}
        >
        <img src={`data:image/png;base64,${this.state.userinfo.image}`} onClick={(e) => this.myRef.current.toggle(e)}/>
        </Avatar>
        
        <OverlayPanel
        ref={this.myRef}
        pt={{
          root: { className: 'surface-ground' }
        }}
        >
          <div className="grid profileDescrip">
            <div className="col-4">
              <Avatar
                shape="circle"
                size="large"
                onClick={(e) => this.myRef.current.toggle(e)}
              >
            <img src={`data:image/png;base64,${this.state.userinfo.image}`} onClick={(e) => this.myRef.current.toggle(e)} alt="image not found"/>
            </Avatar>
            </div>
            <div className="col-8">
              <div><b>{this.state.userinfo.username}</b></div>
              <div>{this.state.userinfo.mobilenumber}</div>
              <div>{this.state.userinfo.address}</div>
            </div>
          </div>
          <div className="grid ">
            <div className="col-12">
              <div><Link  className="p-menubar-list" to="/Settings">Settings</Link></div>
              <div><Link  className="p-menubar-list" to="/" onClick={this.logout}> Logout</Link></div>   
            </div>
          </div>
        </OverlayPanel>
      </div>;

        return (
          <div className="mainNavBar grid">
            <div className="brand col-4">{start}
            </div>
            {localStorage.getItem(`useremail`) != null ?  
            <div className="col-8 navLeftSideController">
              <div className="menu-end ">
                {end}           
              </div>
             
              <div className="menu-middle">
                <ul>
                <div className="navigation" onClick={this.navigationController}>
                    <i className={this.state.navIcon}></i>
                </div>
                  <div className={`${this.state.navigationOff}`} >
                    
                    {
                      localStorage.getItem(`useremail`) != null ? <b><Link to="/">
                      Home
                    </Link></b>: 
                      <></>
                    }
                    <div className="dropdown-menu">
                    </div>
                  </div>
                </ul>
              </div> 
            </div>
            :
            <div className="col-8 navLeftSideController">
              <div  className="menu-middle">
                <ul><b><Link to="/login"> Login </Link></b></ul>
              </div>
            </div>
            }
        </div> 
        );
    }
}
const mapStateToProps = state =>{

}
const mapDispatchToProps = state =>{

}
export default TopNav;