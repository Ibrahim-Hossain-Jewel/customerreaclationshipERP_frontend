import React from "react";
import TopNav from "../menubar/TopNav";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Avatar } from 'primereact/avatar';
import { InputNumber } from 'primereact/inputnumber';
import { connect } from "react-redux";
class Settings extends React.Component{
    custom_file_upload_url = `http://localhost:8888/add`;
    constructor(){
        super();
        this.state = {
            image_file: null,
            image_preview: '',
            username: '',
            newMobileNumber: '',
            newAddress: ''
        }
    }
    updateNameHandler = (e)=>{
        this.setState({username: e.target.value});
    }
    updateMobileNumberHandler = (e)=>{
        this.setState({newMobileNumber: e.target.value});
    }
    UpdateaddressHandler = (e)=>{
        this.setState({newAddress: e.target.value});
    }
    UpdateHandler = (e)=>{
        let basicData = {
            username: this.state.username,
            email: localStorage.getItem("useremail"),
            mobilenumber: this.state.newMobileNumber,
            address: this.state.newAddress
        }
        if(basicData.username && basicData.mobilenumber && basicData.address != ''){
            try{axios.post("http://localhost:8888/user/update", basicData).then((response)=> {
              if (response.data.status === true) {
                this.toast.show({
                severity:'success',
                summary: 'Congratulations!',
                detail: response.data.message,
                life: 3000});
                this.setState({username: '', email: '', password: '', address: ''});
                window.location.href="http://localhost:3000/Settings";
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
                summary: "Required",
                detail: "Please fill-up all field!",
                life: 3000,
              });
        }
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
    handleSubmitFile = () => {
        if(this.state.image_file != null){
            if (!this.state.image_file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                this.toast.show({
                    severity: "warn",
                    summary: "Need Image",
                    detail: "It's not an image",
                    life: 3000,
                  });
            }else{
            if (this.state.image_file !== null){
    
                let formData = new FormData();
                formData.append('useremail', localStorage.getItem('useremail'));
                formData.append('image', this.state.image_file);
    

                axios.post(
                    this.custom_file_upload_url,
                    formData,
                    {
                        headers: {
                            "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                            "Content-type": "multipart/form-data",
                        },                    
                    }
                )
                .then(res => {
                    if (res.data == 'Success') {
                        this.toast.show({
                            severity:'success',
                            summary: 'Uploaded!',
                            detail: res.data,
                            life: 3000});
                            window.location.href="http://localhost:3000/settings";
                    }
                })
                .catch(err => {
                    this.toast.show({
                        severity:'warn',
                        summary: 'Failed!',
                        detail: err,
                        life: 3000});
                })
            }else{
                this.toast.show({
                    severity:'info',
                    summary: 'Failed!',
                    detail: "Select your image",
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
    render(){
        return(
            <div>
                <TopNav />
                <div className="grid">
                    <Toast ref={(el) => (this.toast = el)} />
                    <div className="md:col-6 sm:col-12">
                        <h1>Account details</h1>
                        <p>Name : { localStorage.getItem("username") }</p>
                        <p>Mobile : {localStorage.getItem("mobilenumber")}</p>
                        <p>Address : {localStorage.getItem("address")}</p>
                        <p>Email : {localStorage.getItem("useremail")}</p>
                    </div>
                    <div className="md:col-6 sm:col-12">
                        <h1>Update account</h1>
                        <p>Upload your profile picture </p>
                        {/* image preview */}
                        <Avatar
                        label="P"
                        shape="circle"
                        size="large"
                        image={this.state.image_preview}
                        >
                        {/* <img src={this.state.image_preview} alt="image"/> */}
                        </Avatar> <br />
                        {/* image input field */}
                        <input
                            type="file"
                            onChange={this.handleImagePreview}
                        /><br />
                        <input type="submit" onClick={this.handleSubmitFile} value="Upload"/>
                        <h1>Update Contact Info</h1>
                        <form>
                            <div className="col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                                    <span className="p-float-label">
                                    <InputText
                                    onChange={this.updateNameHandler}
                                    value={this.state.username}
                                    required
                                    />
                                    <label htmlFor="number-input">New name</label>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon"><i className="pi pi-phone" /></span>
                                    <span className="p-float-label">
                                        <InputNumber id="number-input"
                                        onValueChange={this.updateMobileNumberHandler}
                                        aria-autocomplete="on"
                                        useGrouping={false}
                                        value={this.state.newMobileNumber}
                                        required
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
                                    onChange={this.UpdateaddressHandler}
                                    value={this.state.newAddress}
                                    required
                                    />
                                    <label htmlFor="number-input">Address to received</label>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <Button
                                    label="Update"
                                    icon="pi pi-check"
                                    iconPos="right"
                                    onClick={this.UpdateHandler}
                                    />
                                </div>
                            </div>
                        </form>
                    <p>If you need to update your password Please go to the password forgot page</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    //what you want received in component
    console.log("..............", state.profileReducer);
    return{
      accountpicture: state.profileReducer.profileImage,
    }
  }
  const mapDispatchToProps = dispatch =>{
    return{
        
    }
  }  
export default connect(mapStateToProps, mapDispatchToProps)(Settings);