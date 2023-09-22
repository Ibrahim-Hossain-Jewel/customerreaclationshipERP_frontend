import React from "react";
import TopNav from "../menubar/TopNav";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { Dialog } from "primereact/dialog";
import { Dropdown } from 'primereact/dropdown';
import { Link } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
class Home extends React.Component{
    orderplaceAPI = `http://localhost:8888/placeorder`;
    
    constructor(){
        super();
        this.state = {
            allproducts: {},
            productname: '',
            productid: '',
            productstatus: '',
            productcategory: '',
            productdescription: '',
            productimage: '',
            productprice: '',
            productbuyprice:1,
            instoke: '',
            uploaderemail: '',
            cartVisibility: false,
            selectedpaymentmethod: '',
            paymentmethod:[
                {method: "Cash on delivery!"}
            ],
            password: '',
            email: '',
            totalprice: '',
            orderstatus:'pending'
        }
    }
    //containonlyNumber function check is it integer number or not.
    containsOnlyNumbers = (str)=>{
        return /^\d+$/.test(str);
    }
    imageBodyTemplate = (allproduct)=>{
        return <Image src={`data:image/png;base64,${allproduct.image}`} indicatorIcon={<i className="pi pi-check"></i>} alt="Image" preview width="150" height="100"/>
    }
    priceBodyTemplate = (allprice)=>{
        return allprice.price;
    }
    statusBodyTemplate = (allstatus)=>{
        return allstatus.status;
    }
    componentDidMount(){
        console.log("No result found!");
        this.setState({loader: true});
        axios.get(`http://localhost:8888/allproductinfo`).then((response)=> {
            console.log("allprooductinfo", response);
            this.setState({allproducts: response.data, loader: false})
        })
    }
    cartData = (evt, rowData) => {
        console.log("selected row data..............from home", rowData);
        this.setState({
            productname: rowData.name,
            productid: rowData.id,
            productcategory: rowData.category,
            productdescription: rowData.description,
            productstatus: rowData.status,
            productimage: rowData.image,
            productprice: rowData.price,
            productbuyprice: rowData.buyprice,
            uploaderemail: rowData.email,
            instoke: rowData.status,
            cartVisibility: true,
            quantity: 1,
            loader: false
    })   
        //check user need's to login or order confirm
    };
    onChangeDialogInvisible = ()=>{
        this.setState({cartVisibility: false});
    }
    quantityHandler = (e) =>{
        if(this.containsOnlyNumbers(e.target.value) !== true){
            this.toast.show({
                severity: "info",
                summary: "Invalid input!",
                detail: "Supported only number!",
                life: 3000,
              });
        }else{
            this.setState({quantity: e.target.value});
            let totalamount = parseInt(e.target.value)*parseInt(this.state.productprice);
            this.setState({totalprice: totalamount});
        }
    }
    showIcon = (allTableData) => {
        let cartButton = (
          <Button
            style={{ marginLeft: "10px" }}
            onClick={(e) => this.cartData(e, allTableData)}
          >
            Cart
          </Button>
        );
        return (
          <div>
            {cartButton}
          </div>
        );
      };
      refreshHandler = ()=>{
        window.location.href="http://localhost:3000";
      }
      onChangePaymentMethod = (evt)=>{
        this.setState({selectedpaymentmethod: evt.target.value});
    }
    orderPlaceHandler =()=>{
        console.log("hit on confirm order!", this.state.productimage);
        let formData = new FormData();
        formData.append('customername', localStorage.getItem("username"));
        formData.append('customerphonenumber', localStorage.getItem("mobilenumber"));
        formData.append('customeraddress', localStorage.getItem("address"));
        formData.append('customeremail', localStorage.getItem("useremail"));
        formData.append('productid', this.state.productid.toString());
        formData.append('productname', this.state.productname);
        formData.append('productimage', this.state.productimage);
        formData.append('productprice', this.state.productprice);
        formData.append('buyprice', this.state.productbuyprice);
        formData.append('productdescription', this.state.productdescription);
        formData.append('productstatus', this.state.productstatus);
        formData.append('uploaderemail', this.state.uploaderemail);
        formData.append('productcategory', this.state.productcategory);
        formData.append('customercomment', '');
        formData.append('productquantity', this.state.quantity);
        formData.append('totalamount', this.state.totalprice.toString());
        formData.append('paymentmethod', this.state.selectedpaymentmethod.method);
        formData.append('orderstatus', this.state.orderstatus);
        axios.post(this.orderplaceAPI, formData,
        {
            headers: {
                "Content-type": "multipart/form-data",
            },                    
        }).then((res)=>{
            if(res.data.status == true){
                this.toast.show({
                    severity: "info",
                    summary: "Confirmed!",
                    detail: res.data.message,
                    life: 3000,
                  });
                // window.location.href="http://localhost:3000/orderhistory";
            }else{
                this.toast.show({
                    severity: "warn",
                    summary: "Order place not possible!",
                    detail: res.data.message,
                    life: 3000,
                  });
            }
            this.setState({cartVisibility: false})
        })

    }
    render(){
       console.log("productbuy price...", this.state.productbuyprice);
        console.log("allproducts....", this.state.allproducts);
        const header = (
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <span className="text-xl text-900 font-bold">Products</span>
                {
                    this.state.loader? <div className="">
                        <ProgressSpinner style={{width: '30px', height: '30px'}} strokeWidth="5" aria-label="Loading" />
                    </div>: null
                }
                <Button icon="pi pi-refresh" rounded raised onClick={this.refreshHandler}/>
            </div>
        );
        const footer = `In total there are ${this.state.allproducts ? this.state.allproducts.length : 0} products.`;    
        return(
            <div>
                <TopNav />
                {/*userid received from login page after api success*/}
                <h1>Welcome! check your product before received!</h1>
                <div className="grid">      
                    <div className="col-12 md:col-12">
                        <Toast ref={(el) => (this.toast = el)} />
                        

                            <div className="datatable-templating-demo">
                                <DataTable 
                                value={this.state.allproducts}
                                selectionMode="single"
                                header={header}
                                footer={footer} 
                                removableSort
                                >                                    
                                    <Column field="name" header="Name" sortable />
                                    <Column header="Image" body={this.imageBodyTemplate} sortable />
                                    <Column field="price" header="Price" body={this.priceBodyTemplate} sortable />
                                    <Column field="description" header="Description" sortable />
                                    <Column header="Status" body={this.statusBodyTemplate} sortable />
                                    <Column field="" header="Buy" body={this.showIcon} />
                            
                                </DataTable>
                            </div>
                        {/*Update section*/}
                        {
                            localStorage.getItem(`useremail`) == null ? 
                            <Dialog
                            header="Please Login first"
                            visible={this.state.cartVisibility}
                            onHide={this.onChangeDialogInvisible}
                            breakpoints={{ "960px": "75vw" }}
                            style={{ width: "50vw" }}
                            >            
                                    <div className="grid  sm:col-12">
                                        <div className="col-12 md:col-12">
                                            <span>Go to <Link to="/login">Login</Link> to buy product</span>
                                        </div>
                                    </div>
                            </Dialog>
                            :<Dialog
                            header="Place order"
                            visible={this.state.cartVisibility}
                            onHide={this.onChangeDialogInvisible}
                            breakpoints={{ "960px": "75vw" }}
                            style={{ width: "50vw" }}
                        >
                            <div className="grid">
                            <div className="col-12 md:col-12">
                            <div className="col-12 md:col-12">
                                <div><b>Name : </b>{this.state.productname}</div>
                                <div><b>Price : </b>{ parseFloat(this.state.productprice) } tk kg <b>Total Amount : </b> {this.state.totalprice}</div>
                                <div><b>Delivery Date: </b> Tomorrow</div>
                                <div><b>Description : </b> {this.state.productdescription}</div>
                                <Image src={`data:image/png;base64,${this.state.productimage}`} indicatorIcon={<i className="pi pi-check"></i>} alt="Image" preview width="150" height="100"/> <br /> 
                                </div>
                                <div className="col-12 md:col-12">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label">
                                    <InputText
                                        placeholder="Quantity"
                                        onChange={this.quantityHandler}
                                    />
                                            <label htmlFor="number-input">Enter Quantity</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 md:col-12">
                                    <div className="p-inputgroup">
                                    
                                    <span className="p-float-label">
                                        <Dropdown value={this.state.selectedpaymentmethod} onChange={this.onChangePaymentMethod} options={this.state.paymentmethod} optionLabel="method" 
                                            className="w-full md:w-14rem" />
                                        <label htmlFor="number-input">Select Payment Method</label>
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-12">
                                <div className="p-inputgroup">
                                <Button
                                    label="Confirm Order"
                                    icon="pi pi-check"
                                    iconPos="right"
                                    onClick={this.orderPlaceHandler}
                                />
                                </div>
                            </div>
                            </div>
                        </Dialog> 
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;