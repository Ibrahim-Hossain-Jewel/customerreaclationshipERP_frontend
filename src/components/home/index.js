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
import { Password } from 'primereact/password';
import { Link } from "react-router-dom";
class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            allproducts: {},
            productname: '',
            productcategory: '',
            productdescription: '',
            productimage: '',
            productprice: '',
            instoke: '',
            cartVisibility: false,
            selectedpaymentmethod: '',
            paymentmethod:[
                {method: "Cash on delivery!"}
            ],
            password: '',
            email: '',
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
        axios.get(`http://localhost:8888/allproductinfo`).then((response)=> {
            this.setState({allproducts: response.data})
        })
    }
    cartData = (evt, rowData) => {
        console.log("selected row data", rowData);
        this.setState({
            productname: rowData.name,
            productcategory: rowData.category,
            productdescription: rowData.description,
            productimage: rowData.image,
            productprice: rowData.price,
            instoke: rowData.status,
            cartVisibility: true,
            quantity: 1,
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
        console.log("hit on confirm order!");
        let basicData = {
            // customername: this.state.user,
            //     customerphonenumber,
            //     customeraddress,
            //     customeremail,
            //     productid,
            //     productname,
            //     encodedString,
            //     productprice,
            //     productdescription,
            //     productstatus,
            //     productcategory,
            //     uploaderemail
        }
    }
    render(){
        console.log("allproducts....", this.state.allproducts);
        const header = (
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <span className="text-xl text-900 font-bold">Products</span>
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
                                <div><b>Price : </b>{ (parseFloat(this.state.productprice) * this.state.quantity) === 0?this.state.productprice: (parseFloat(this.state.productprice) * this.state.quantity)} tk</div>
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