import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import RootTopNav from "../rootusermenubar/RootTopNav";
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { InputTextarea } from 'primereact/inputtextarea';
 
class RootChatList extends React.Component{
    products_upload_url = `http://localhost:8888/addproducts`;
    constructor(){
        super();
        this.state = {
            userlist: [],
            loader: false,
            message: ''
        }
    }
    onchangeMessageHandler = (e)=>{
        console.log(".....", e.target.value);
        this.setState({message: e.target.value});
    }
    render(){
        console.log("...... message", this.state.message)
       return(
       <div>
            <RootTopNav />
            <div className="grid sm:col-12">
                <Toast ref={(el) => (this.toast = el)} />
                <div className="col-12  md:col-6">
                    <h1>Welcome! all customer list</h1>                    
                    <Avatar label="P" size="large"/>
                </div>
                <div className="col-12 md:col-6">
                    <h1>Name of person</h1>
                    <div className="chatCase">    
                        <p className="firstperson">Hi</p>
                        <p className="secondperson">Hello</p>
                    </div>
                    <InputTextarea rows={2} cols={40} value={this.state.message} onChange={this.onchangeMessageHandler} />
                        <div className="p-inputgroup">
                        <Button
                            label="Send"
                            icon="pi pi-check"
                            iconPos="right"
                            onClick={this.handleSubmitFile}
                        />
                        </div>
 
                </div>
            </div>
      </div>)
    }
}
export default RootChatList;