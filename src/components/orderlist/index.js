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
import RootTopNav from "../rootusermenubar/RootTopNav";
import { Calendar } from 'primereact/calendar';
 
class OrderList extends React.Component{
    orderplaceAPI = `http://localhost:8888/placeorder`;
    
    constructor(){
        super();
        this.state = {
            allorder: [],
            cartVisibility: false,
            fromdate: '',
            todate: '',
            buyprice: '',
        }
    }
    //containonlyNumber function check is it integer number or not.
    containsOnlyNumbers = (str)=>{
        return /^\d+$/.test(str);
    }
    imageBodyTemplate = (allproduct)=>{
        return <Image src={`data:image/png;base64,${allproduct.productimage}`} indicatorIcon={<i className="pi pi-check"></i>} alt="Image" preview width="150" height="100"/>
    }
    componentDidMount(){
        console.log("No result found!");
        this.setState({loader: true});
        axios.get(`http://localhost:8888/allproductorderlistbydate`).then((response)=> {
            console.log("allproductorderlistbydate", response);
            this.setState({allorder: response.data, loader: false})
        })
    }

    cartData = (evt, rowData) => {
        console.log("selected row data....", rowData);
        this.setState({
            productname: rowData.name,
            productid: rowData.id,
            productcategory: rowData.category,
            productdescription: rowData.description,
            productstatus: rowData.status,
            productimage: rowData.image,
            productprice: rowData.price,
            uploaderemail: rowData.email,
            instoke: rowData.status,
            cartVisibility: true,
            quantity: 1,
            loader: false
    })   
        //Check user need's to login or order confirm
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
            Change
          </Button>
        );
        return (
          <div>
            {cartButton}
          </div>
        );
      };
      refreshHandler = ()=>{
        window.location.href="http://localhost:3000/orderlist";
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
        // formData.append('productbuyprice', this.state.produc)
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
                window.location.href="http://localhost:3000/orderlist";
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
    orderDate = (rowdata)=>{
        var isoDateTime = new Date(rowdata.orderdate);
        var localDateTime = isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString();
        return localDateTime;
    }
    formattedDate = (e)=>{
        let format = e.getFullYear() + '-' + parseInt((e.getMonth())+1)+'-'+ e.getDate();
        return format;
    }
    onChangeSetFromDate = (e)=>{
        this.setState({fromdate: this.formattedDate(e.value)});
    }
    onChangeSetToDate = (e)=>{
        this.setState({todate: this.formattedDate(e.value)});
    }
    onSubmitTodateFromDate = (e)=>{
        let basicData = {
            fromdate: this.state.fromdate,
            todate: this.state.todate,
        }
        console.log("basic data....", basicData);
        axios.get(`http://localhost:8888/selectorderlistbytodatefromdate?fromdate=${basicData.fromdate}&todate=${basicData.todate}`).then((response)=> {
            console.log("selectorderlistbytodatefromdate", response);
            this.setState({allorder: response.data, loader: false});
        })
    }
    render(){
        const header = (
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <span className="text-xl text-900 font-bold">Orders today</span>
                {
                    this.state.loader? <div className="">
                        <ProgressSpinner style={{width: '30px', height: '30px'}} strokeWidth="5" aria-label="Loading" />
                    </div>: null
                }
                <Button icon="pi pi-refresh" rounded raised onClick={this.refreshHandler}/>
            </div>
        );
        const footer = `In total there are ${this.state.allorder ? this.state.allorder.length : 0} products.`;
        return(
            <div>
                <RootTopNav />
                <div className="grid">
                <h2>Search by date</h2>
                    <div className="col-12 md:col-12 dateController">
                            
                                <div className="one">
                                    <label>From Date </label>
                                    <Calendar value={this.state.fromdate} onChange={this.onChangeSetFromDate} placeholder="Select from date" dateFormat="yy-mm-dd" monthNavigator yearNavigator yearRange="2023:2024" touchUI ></Calendar>
                                </div>
                                {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                                <div className="two">
                                
                                    <label>To Date </label>
                                    <Calendar value={this.state.todate} onChange={this.onChangeSetToDate} placeholder="Select to date" dateFormat="yy-mm-dd" monthNavigator yearNavigator yearRange="2023:2024" touchUI ></Calendar>
                                </div>
                                <div className="three">
                                    <Button
                                        label="Search"
                                        icon="pi pi-check"
                                        iconPos="right"
                                        onClick={this.onSubmitTodateFromDate}
                                    />
                                </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <Toast ref={(el) => (this.toast = el)} />
                            <div className="datatable-templating-demo">
                                <DataTable 
                                value={this.state.allorder}
                                selectionMode="single"
                                header={header}
                                footer={footer}
                                >                                    
                                    <Column field="customername" header=" Customer Name" />
                                    <Column field="customeraddress" header="Address" />
                                    <Column field="customerphonenumber" header="Phone" />
                                    <Column field="customeremail" header="Email" />
                                    <Column body = {this.orderDate} header="Order Date" />
                                    <Column header="Image" body={this.imageBodyTemplate} />
                                    <Column field="orderid" header="OrderID"/>
                                    <Column field="productprice" header="Price"/>
                                    <Column field="productquantiy" header="Quantity" />
                                    <Column field="totalamount" header="Total Price"/>
                                    <Column field="productcategory" header="Category"/>
                                    <Column field="productdescription" header="Description"/>
                                    <Column field="orderstatus" header="Status" />
                                    <Column field="" header="Delivery" body={this.showIcon} />
                            
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
                                            <span>Go to <Link to="/rootloginlogin">Login</Link></span>
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
                                <div><b>Name : </b>{this.state.allorder.productname}</div>
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
export default OrderList;