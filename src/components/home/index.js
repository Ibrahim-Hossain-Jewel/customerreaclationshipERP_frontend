import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../search";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from "primereact/toast";
        

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            conditional: true,
            password: '',
            email: '',
            status: false,
            userdetail: 0,
            setErrorMessage: ''
        };
    }
    emailHandler = (evt)=>{
        this.setState({email: evt.target.value})
    }
    passwordHandler = (evt)=>{
        this.setState({password: evt.target.value});
    }
    loginHandler = (evt)=>{
        let basicData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:9999/login", basicData).then((response)=> {
            if(response.data.status !== false){
                localStorage.setItem("profile", response.data.status);
                localStorage.setItem("userid", response.data.userid);
            }else{
                this.toast.show({
                    severity:'warn',
                    summary: 'Password Match',
                    detail: response.data.message,
                    life: 3000});
            }
            this.setState({status: response.data.status, userdetail: response.data})
        })
    }
    render(){
        
        return(
        <>
            {
                localStorage.getItem("profile")? (
                    <div>
                        <Search />
                    </div>): (
                    <div className="grid sm:col-12">
                <Toast ref={(el) => (this.toast = el)} />
            <div className="col-4">

            </div>
            <div className="col-12  md:col-4">
            
                <h1>User Login</h1>
                <div className="grid  sm:col-12">
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon"><i className="pi pi-envelope" /></span>
                            <InputText
                                placeholder="Enter email"
                                onChange={this.emailHandler}
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon"><i className="pi pi-unlock" /></span>
                            <Password 
                            value={this.state.password} 
                            onChange={this.passwordHandler} 
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
                                onClick={this.loginHandler}
                            />
                            {
                                this.state.status?<ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />: null
                            }
                        </div>
                        <p>Don't have an account? <Link to="/registration">Registration</Link> now.</p>
                    </div>
                </div>
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
export default Home;