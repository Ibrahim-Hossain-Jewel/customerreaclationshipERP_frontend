import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";
class ForgotPassword extends React.Component{
    constructor() {
        super();
        this.state = {
            conditional: true,
            email: '',
            status: false,
            userdetail: 0,
            setErrorMessage: ''
        };
    }
    forgotEmailHandler = (evt)=>{
        this.setState({email: evt.target.value})
    }
    forgotSubmitHandler = (evt)=>{
        evt.preventDefault();
        let basicData = {
            email: this.state.email,
        }
        axios.post("http://localhost:8888/user/forgot", basicData).then((response)=> {
            console.log("your response....", response);    
        if(response.data.status !== false){
            }else{
                this.toast.show({
                    severity:'warn',
                    summary: 'Password Match',
                    detail: response.data.message,
                    life: 3000});
            }
        })
    }
    render(){
        console.log("Enter your valid email", this.state.email);
        return(
            <div className="grid sm:col-12">
                <Toast ref={(el) => (this.toast = el)} />
            <div className="col-4">

            </div>
            <div className="col-12  md:col-4">
                <h1>Please Enter your valid Email</h1>
                <form onSubmit={this.forgotSubmitHandler}>
                    <div className="grid  sm:col-12">
                        <div className="col-12 md:col-12">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon"><i className="pi pi-envelope" /></span>
                                <InputText
                                    placeholder="Enter account email"
                                    onChange={this.forgotEmailHandler}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="col-12 md:col-12">
                            <div className="p-inputgroup">
                                <Button
                                    label="Send OTP"
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
}

export default ForgotPassword;