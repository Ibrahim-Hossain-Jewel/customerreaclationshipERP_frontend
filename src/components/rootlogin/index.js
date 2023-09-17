import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import axios from "axios";
import Home from "../home";
import { Toast } from "primereact/toast";
import RootTopNav from "../rootusermenubar/RootTopNav";
class RootLogin extends React.Component{
    constructor() {
        super();
        this.state = {
            password: '',
            email: '',
            status: ''
        };
    }
    rootEmailHandler = (evt)=>{
        this.setState({email: evt.target.value})
    }
    rootPasswordHandler = (evt)=>{
        this.setState({password: evt.target.value});
    }
    rootLoginHandler = (evt)=>{
        evt.preventDefault();
        let basicData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:8888/rootuser/login", basicData).then((response)=> {
            console.log("response.....................", response)
            if(response.data.status !== false){
                localStorage.setItem("rootprofile", response.data.status);
                localStorage.setItem("rootuseremail", this.state.email);
            }else{
                this.toast.show({
                    severity:'warn',
                    summary: 'Password not Match',
                    detail: response.data.message,
                    life: 3000});
            }
            this.setState({status: response.data.status})
        })
    }
    render(){
        console.log("....", this.state.email, this.state.password)
        return(
        <>
            {
                localStorage.getItem("rootprofile")? (
                    <div>
                        <RootTopNav />
                        <h1>Welcome to root profile</h1>
                    </div>): (
                    <div className="grid sm:col-12">
                <Toast ref={(el) => (this.toast = el)} />
            <div className="col-4">

            </div>
            <div className="col-12  md:col-4">
                <h1>Welcome to ERP System</h1>
                <form onSubmit={this.rootLoginHandler}>
                    <div className="grid  sm:col-12">
                        <div className="col-12 md:col-12">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon"><i className="pi pi-envelope" /></span>
                                <InputText
                                    placeholder="Enter email"
                                    onChange={this.rootEmailHandler}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="col-12 md:col-12">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon"><i className="pi pi-unlock" /></span>
                                <Password 
                                value={this.state.password} 
                                onChange={this.rootPasswordHandler} 
                                toggleMask
                                placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        
                        <div className="col-12 md:col-12">
                            <div className="p-inputgroup">
                                <Button
                                    label="Login"
                                    icon="pi pi-check"
                                    iconPos="right"
                                />
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div className="col-4">

            </div>
        </div>
                    )
            }
        </>
        )
    }
}

export default RootLogin;