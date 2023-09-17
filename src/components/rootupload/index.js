import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import RootTopNav from "../rootusermenubar/RootTopNav";

class RootUpload extends React.Component{
    products_upload_url = `http://localhost:8888/addproducts`;
    constructor(){
        super();
        this.state = {
            productname: '',
            productimage: '',
            productprice: '',
            productdescription: '',
            selectedproductstatus: '',
            selectedproductcategory: '',
            image_file: null,
            image_remove: false,
            image_preview: '',
            productstatus: [
                {status: "In stoke"},
                {status: "Out of stoke"}
            ],
            productsCategory : [
                { productname: 'Fish'},
                { productname: 'Patali'},
                { productname: 'Hanny'}
            ],
            loader: false
        }
    }
    productNameHandler = (e)=>{
        this.setState({productname: e.target.value});
    }
    productPriceHandler = (e)=>{
        this.setState({productprice: e.target.value});
    }
    productDescriptionHandler = (e)=>{
        this.setState({productdescription: e.target.value});
    }
    productStatusHandler = (e) =>{
        this.setState({selectedproductstatus: e.target.value});
    }
    productCategoryHandler = (e) =>{
        this.setState({selectedproductcategory: e.target.value});
    }
    //image functionality
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
                formData.append('name', this.state.productname);
                formData.append('image', this.state.image_file);
                formData.append('price', this.state.productprice);
                formData.append('description', this.state.productdescription);
                formData.append('status', this.state.selectedproductstatus.status);
                formData.append('category', this.state.selectedproductcategory.productname);
                formData.append('email', "ibrahim@gmail.com");
                axios.post(
                    this.products_upload_url,
                    formData,
                    {
                        headers: {
                            "Content-type": "multipart/form-data",
                        },                    
                    }
                )
                .then(res => {
                    if (res.data.status == true) {
                        this.toast.show({
                            severity:'success',
                            summary: 'Uploaded!',
                            detail: res.data.message,
                            life: 3000});
                    this.setState({
                        productname: '',
                        productimage: '',
                        productprice: '',
                        productdescription: '',
                        selectedproductstatus: '',
                        selectedproductcategory: '',
                        image_file: '',
                        image_remove: true,
                        image_preview: '',});
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
    // Image functionality end
    render(){
       return(
       <div>
            <RootTopNav />
            <div className="grid sm:col-12">
                <Toast ref={(el) => (this.toast = el)} />
                
                <div className="col-12  md:col-6">
                    
                    <h1>Welcome! upload your product</h1>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                        <span className="p-float-label">
                        <InputText
                            onChange={this.productNameHandler}
                            value={this.state.productname}
                        />
                        <label htmlFor="number-input">Product name</label>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        {/* <div>Upload Image </div> */}
                        <div className='file-input'>
                        <input type='file' onChange={this.handleImagePreview} name="file" key={this.state.image_remove}/>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                        <span className="p-float-label">
                        <InputText
                            onChange={this.productPriceHandler}
                            value={this.state.productprice}
                        />
                        <label htmlFor="number-input">Product price</label>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                        <span className="p-float-label">
                        <InputText
                            onChange={this.productDescriptionHandler}
                            value={this.state.productdescription}
                        />
                        <label htmlFor="number-input">Product description</label>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                        <span className="p-float-label">
                            <Dropdown value={this.state.selectedproductstatus} onChange={this.productStatusHandler} options={this.state.productstatus} optionLabel="status" 
                                className="w-full md:w-14rem" />
                            <label htmlFor="number-input">Product status</label>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                            <span className="p-float-label">
                                <Dropdown value={this.state.selectedproductcategory} onChange={this.productCategoryHandler} options={this.state.productsCategory} optionLabel="productname" 
                                    className="w-full md:w-14rem" />
                                <label htmlFor="number-input">Product Category</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <Button
                            label="Upload Product"
                            icon="pi pi-check"
                            iconPos="right"
                            onClick={this.handleSubmitFile}
                        />
                        </div>
                        <p>Contact with your software provider if you need more product upload account now.</p>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <h1>Product details</h1>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                        <b htmlFor="number-input">Product name : &emsp;</b>
                        <span>{this.state.productname}</span>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                        <div>
                            <b htmlFor="number-input">Product image : &emsp;</b>
                        </div>
                        <Image src={this.state.image_preview} indicatorIcon={<i className="pi pi-check"></i>} alt="Image" preview width="150" height="100"/>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                        <b htmlFor="number-input">Product price : &emsp;</b>
                        <span>{this.state.productprice}</span>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                        <b htmlFor="number-input">Product description : &emsp;</b>
                        <span>{this.state.productdescription}</span>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                        <b htmlFor="number-input">Product status : &emsp;</b>
                        <span>{this.state.selectedproductstatus.status}</span>
                        </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                        <b htmlFor="number-input">Product category : &emsp;</b>
                        <span>{this.state.selectedproductcategory.productname}</span>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
      </div>)
    }
}
export default RootUpload;