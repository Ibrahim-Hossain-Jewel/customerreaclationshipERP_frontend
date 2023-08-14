import React from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from 'axios';
class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      conditional: true,
      password: '',
      email: '',
      setErrorMessage: '', 
    };
  }
  emailHandler = (evt)=>{
    this.setState({email: evt.target.value});
  }
  RegPasswordHandler = (evt)=>{
    this.setState({password: evt.target.value});
  }
  
  RegistrationHandler = (evt)=>{
      let basicData = {
        email: this.state.email,
        password: this.state.password
    }
    axios.post("http://localhost:9999/registration", basicData).then((response)=> {
        if (response.data.status === true) {
          this.toast.show({
          severity:'success',
          summary: 'Congratulations!',
          detail: response.data.message,
          life: 3000});
        }else{
          this.toast.show({
            severity: "info",
            summary: "Exist",
            detail: response.data.message,
            life: 3000,
          });
        }
    })
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
                    onChange={this.RegPasswordHandler} 
                    toggleMask
                    placeholder="Enter your password"
                    />
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
