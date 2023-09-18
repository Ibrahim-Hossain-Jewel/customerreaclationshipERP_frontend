import React from "react";
import { Link } from "react-router-dom";
import '../menubar/style.scss';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Avatar } from 'primereact/avatar';
import axios from "axios";
class RootTopNav extends React.Component{
    constructor(){
        super();
        this.myRef = React.createRef();
        this.state = {
          off: "hidden",
          dropdown: "pi pi-angle-down",
          themeContent: "Dark",
          themeIcon: "pi pi-sun",
          themeState: false,
          userinfo: []
        }
    }
    logout = (evt)=>{
      window.location.href="http://localhost:3000/rootlogin"
      return localStorage.clear();
    }
    componentDidMount(){
      if(localStorage.getItem(`rootuseremail`) != null){
        axios.get(`http://localhost:8888/specificrootuserinfo?email=${localStorage.getItem(`rootuseremail`)}`).then((response)=> {
          console.log("reponse...", response)
            this.setState({userinfo: response.data});
            // localStorage.setItem("rootid", response.data.rootid);
            // localStorage.setItem("rootusername", response.data.rootusername);
            // localStorage.setItem("rootemail", response.data.rootemail);
            // localStorage.setItem("rootaddress", response.data.rootaddress);
            // localStorage.setItem("rootimage", response.data.rootimage);
            // localStorage.setItem("rootemail", response.data.rootemail);
        })
      }
    }

    render(){
      console.log("................................. from root top nav", this.state.userinfo)
      const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2" />;
      const end = 
      <div>
        <Avatar
          shape="circle"
          size="large"
          onClick={(e) => this.myRef.current.toggle(e)}
        >
        <img src={`data:image/png;base64,${this.state.userinfo.rootimage}`} onClick={(e) => this.myRef.current.toggle(e)}/>
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
            <img src={`data:image/png;base64,${this.state.userinfo.rootimage}`} onClick={(e) => this.myRef.current.toggle(e)} alt="image not found"/>
            </Avatar>
            </div>
            <div className="col-8">
              <div><b>{this.state.userinfo.rootusername}</b></div>
              <div>{this.state.userinfo.rootmobilenumber}</div>
              <div>{this.state.userinfo.rootaddress}</div>
            </div>
          </div>
          <div className="grid ">
            <div className="col-12">
            <div>
            <div><Link  className="p-menubar-list" to="/rootupload">Upload</Link>
            </div>
            <div><Link to="/chat">Chat List</Link></div>
            <Link  className="p-menubar-list" to="/" onClick={this.logout}> Logout</Link>
            
              </div>   
            </div>
          </div>
        </OverlayPanel>
      </div>;

        return (
          <div className="mainNavBar grid">
            <div className="brand col-4">{start}
            </div>
            {localStorage.getItem(`rootuseremail`) != null ?  
            <div className="col-8 navLeftSideController">
              <div className="menu-end">
                {end}
              </div>
             
              <div className="menu-middle">
                <ul>
                <div className="navigation">
                </div>
                  <div>
                    {
                      localStorage.getItem(`rootuseremail`) != null ? <b>
                        <Link to="/rootlogin" style={{textDecoration: "none"}}>
                        &nbsp; Home</Link>
                        <Link  className="p-menubar-list" style={{textDecoration: "none"}} to="/orderlist"> &nbsp; Order</Link>
                    </b>
                    
                    : 
                      null
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
                <ul>
                </ul>
              </div>
            </div>
            }
        </div> 
        );
    }
}
export default RootTopNav;