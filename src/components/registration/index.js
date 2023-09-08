import React from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      conditional: true,
      username: '',
      password: '',
      email: '',
      mobilenumber: '',
      address: '',
      setErrorMessage: '', 
    };
  }
  nameHandler = (evt) =>{
    this.setState({username: evt.target.value});
  }
  emailHandler = (evt)=>{
    this.setState({email: evt.target.value});
  }
  RegPasswordHandler = (evt)=>{
    this.setState({password: evt.target.value});
  }
  mobilenumberHandler = (evt)=>{
    this.setState({mobilenumber: evt.value});
  }
  addressHandler = (evt)=>{
    this.setState({address: evt.target.value})
  }
  RegistrationHandler = (evt)=>{
      if(this.state.email !== null && this.state.mobilenumber != null && this.state.password){
            let basicData = {
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              mobilenumber: this.state.mobilenumber,
              address: this.state.address
          }
          
          try{axios.post("http://localhost:8888/user/registration", basicData).then((response)=> {
              if (response.data.status === true) {
                this.toast.show({
                severity:'success',
                summary: 'Congratulations!',
                detail: response.data.message,
                life: 3000});
                this.setState({username: '', email: '', password: '', address: ''});
              }else{
                this.toast.show({
                  severity: "info",
                  summary: "Exist",
                  detail: response.data.message,
                  life: 3000,
                });
              }
          })}catch(e){
          }
      }else{
        this.toast.show({
          severity: "info",
          summary: "Unable",
          detail: "Your Mobile number or Email empty",
          life: 3000,
        });
      }
  }
  render() {
return (
      <div className="grid sm:col-12">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="col-4"></div>
        <div className="col-12  md:col-4">
              <h1>Registration page</h1>
              <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                    <span className="p-float-label">
                    <InputText
                      onChange={this.nameHandler}
                      value={this.state.username}
                    />
                    <label htmlFor="number-input">Your name</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-envelope" /></span>
                    <span className="p-float-label">
                    <InputText
                      onChange={this.emailHandler}
                      value={this.state.email}
                    />
                    <label htmlFor="number-input">Valid Email to Login</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-unlock" /></span>
                    <span className="p-float-label">
                    <Password 
                    onChange={this.RegPasswordHandler} 
                    toggleMask
                    value={this.state.password}
                    />
                    <label htmlFor="number-input">Set Password to Login</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-phone" /></span>
                    <span className="p-float-label">
                        <InputNumber id="number-input"
                         onValueChange={this.mobilenumberHandler}
                         useGrouping={false}
                         value={this.state.mobilenumber}
                         />
                        <label htmlFor="number-input">Mobile Number</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-map-marker" /></span>
                    <span className="p-float-label">
                    <InputText
                      onChange={this.addressHandler}
                      value={this.state.address}
                    />
                    <label htmlFor="number-input">Address to received</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <Button
                      label="Registration"
                      icon="pi pi-check"
                      iconPos="right"
                      onClick={this.RegistrationHandler}
                    />
                  </div>
                  <p>Already have an account? <Link to="/">Login</Link> now.</p>
                </div>
        </div>
      </div>
    );
  }
}
export default Registration;
