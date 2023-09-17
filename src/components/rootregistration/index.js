import React from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import axios from 'axios';
class RootRegistration extends React.Component {
    rootUserRegistrationAPI = "http://localhost:8888/rootuserregistration";
    constructor() {
        super();
        this.state = {
            conditional: true,
            rootusername: '',
            rootpassword: '',
            rootemail: '',
            rootmobilenumber: '',
            rootaddress: '',
            image_file: null,
            image_remove: false,
            image_preview: '',
        };
  }

  nameHandler = (evt) =>{
    this.setState({rootusername: evt.target.value});
  }
  emailHandler = (evt)=>{
    this.setState({rootemail: evt.target.value});
  }
  RegPasswordHandler = (evt)=>{
    this.setState({rootpassword: evt.target.value});
  }
  mobilenumberHandler = (evt)=>{
    this.setState({rootmobilenumber: evt.target.value});
  }
  addressHandler = (evt)=>{
    this.setState({rootaddress: evt.target.value})
  }
  // Image Preview Handler
  handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }
    // Image/File Submit Handler
    RegistrationRootUserHandler = () => {
        console.log("hit on registration on root user!")
        if(this.state.image_file != null){
            console.log("hit on image not null");
            if (!this.state.image_file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                this.toast.show({
                    severity: "warn",
                    summary: "Need Image",
                    detail: "It's not an image support format jpg|jpeg|png|gif",
                    life: 3000,
                  });
            }else{
            if (this.state.image_file !== null){
            console.log("hit on image not null");
                let formData = new FormData();
                formData.append('rootusername', this.state.rootusername);
                formData.append('rootemail', this.state.rootemail);
                formData.append('rootpassword', this.state.rootpassword);
                formData.append('rootmobilenumber', this.state.rootmobilenumber);
                formData.append('rootaddress', this.state.rootaddress);
                formData.append('rootimage', this.state.image_file);
                axios.post(
                    this.rootUserRegistrationAPI,
                    formData,
                    {
                        headers: {
                            "Content-type": "multipart/form-data",
                        },                    
                    }
                )
                .then(res => {
                    console.log("res...........", res)
                    if (res.data.status == true) {
                        this.toast.show({
                            severity:'Success',
                            summary: 'Registration success!',
                            detail: res.data.message,
                            life: 3000});
                    this.setState({
                        rootusername: '',
                        rootaddress: '',
                        rootemail: '',
                        rootmobilenumber: '',
                        rootpassword: '',
                        image_file: '',
                        image_remove: true,
                        image_preview: '',});
                    }else{
                        this.toast.show({
                            severity:'warn',
                            summary: 'Account!',
                            detail: res.data.message,
                            life: 3000});
                    }
                })
                .catch(err => {
                    this.toast.show({
                        severity:'warn',
                        summary: 'Failed to registration!',
                        detail: err,
                        life: 3000});
                })
            }else{
                this.toast.show({
                    severity:'info',
                    summary: 'Failed!',
                    detail: "Select png|jpeg|jpg image",
                    life: 3000});
            }
            }    
        }else{
            this.toast.show({
                severity: "warn",
                summary: "All field are required!",
                detail: "Your field is empty",
                life: 3000,
              });
        }
    }
    // Image functionality end
  render() {
    console.log("this.state.image_file", this.state.image_file)
    console.log("this.state.rootaddress", this.state.rootaddress)
    console.log("this.state.rootmobilenumber", this.state.rootmobilenumber)
    console.log("this.state.rootpassword", this.state.rootpassword)
    console.log("this.state.rootemail", this.state.rootemail)
    console.log("this.state.rootusername", this.state.rootusername)
return (
      <div className="grid sm:col-12">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="col-4"></div>
        <div className="col-12  md:col-4">
              <h1>Unexpected page</h1>
              <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                    <span className="p-float-label">
                    <InputText
                      onChange={this.nameHandler}
                      value={this.state.rootusername}
                    />
                    <label htmlFor="number-input">Root username</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                    <div className='file-input'>
                    <input type='file' onChange={this.handleImagePreview} name="file" key={this.state.image_remove}/>
                    </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-envelope" /></span>
                    <span className="p-float-label">
                    <InputText
                      onChange={this.emailHandler}
                      value={this.state.rootemail}
                    />
                    <label htmlFor="number-input">Valid root email</label>
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
                    value={this.state.rootpassword}
                    />
                    <label htmlFor="number-input">Set Password</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-phone" /></span>
                    <span className="p-float-label">
                         <InputText id="number-input"
                            onChange={this.mobilenumberHandler}
                            value={this.state.rootmobilenumber}
                            />
                        <label htmlFor="number-input">Office mobile number</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon"><i className="pi pi-map-marker" /></span>
                    <span className="p-float-label">
                    <InputText
                      onChange={this.addressHandler}
                      value={this.state.rootaddress}
                    />
                    <label htmlFor="number-input">Office address</label>
                    </span>
                  </div>
                </div>
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <Button
                      label="RegistrationForRootUser"
                      icon="pi pi-check"
                      iconPos="right"
                      onClick={this.RegistrationRootUserHandler}
                    />
                  </div>
                </div>
        </div>
      </div>
    );
  }
}
export default RootRegistration;
