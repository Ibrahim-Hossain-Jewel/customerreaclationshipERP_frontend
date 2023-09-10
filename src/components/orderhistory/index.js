import React from "react";
import TopNav from "../menubar/TopNav";
import axios from "axios";
import { Toast } from "primereact/toast";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { Button } from "primereact/button";
import { ConfirmPopup } from 'primereact/confirmpopup';
class OrderHistory extends React.Component{
    constructor(){
        super();
        this.buttonEl = React.createRef();
        this.arr = [];
        this.sortedOrderId = [];
        this.state = {
            OrderHistoryInfo: [],
            visible: false,
            deleteRowData: '',
            counterCheck: 1
        }
    }
    componentDidMount(){
        console.log("useremail first from component did mount", localStorage.getItem("useremail"));
        axios.get(`http://localhost:8888/orderlist?customeremail=${localStorage.getItem("useremail")}`).then((response)=> {
            let reversedData = [];
            console.log("reversed order.....", response.data.length);
            for(let i = response.data.length-1; i>=0; i--){
                reversedData.push(response.data[i])
            }
            this.setState({OrderHistoryInfo: reversedData});
        })
    }
    imageBodyTemplate = (allproduct)=>{
        return <Image src={`data:image/png;base64,${allproduct.productimage}`} indicatorIcon={<i className="pi pi-check"></i>} alt="Image" preview width="150" height="100"/>
    }
    statusBodyTemplate = (productStatus)=>{
        return productStatus.orderstatus;
    }
    
    showIcon = (allTableData) => {
        console.log("selected data that you want to delete", allTableData)
        let cartButton = (
          <div className="grid">
            <div className="sm:col-12 md:col-12">
                {/*delete section && confirm pop up*/}
                <ConfirmPopup target={this.buttonEl.current} visible={this.state.visible} onHide={this.onChangeSetVisible}
                message="Are you sure you want to delete?" icon="pi pi-exclamation-triangle" accept={this.accept} reject={this.reject} className="card justify-content-center" />
                <div className="card flex justify-content-center">
                    <Button
                        // ref={this.buttonEl}
                        style={{ marginRight: "10px" }}
                        onClick={(e) => this.onChangeSetVisible(e, allTableData)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
          </div>
        );
        return (
          <div>
            {cartButton}
          </div>
        );
      };
    accept = () => {
        console.log("delete row data", this.state.deleteRowData);
        try{            
            axios.delete(`http://localhost:8888/delete/${this.state.deleteRowData.orderid}`);
            window.location.href="http://localhost:3000/orderhistory"
        }catch(e){
            console.log("e.....", e);
        }
        this.toast.show({
            severity: "Info",
            summary: "Deleted!",
            detail: "Delete Successful!",
            life: 3000,
          });
    };
    reject = () => {
        this.toast.show({
            severity: "warn",
            summary: "Cancel!",
            detail: "Delete cancelled!",
            life: 3000,
          });
    };
    onChangeSetVisible =(e, rowData)=>{
        console.log("onchangesetVisible row data", rowData);
        this.setState({visible: !this.state.visible, deleteRowData: rowData});
    }
    // arrOrder =(commingarr)=>{
    //     this.arr.push(commingarr);
    //     if(this.arr != '' && this.arr != null){
    //         const man = this.arr.sort((a, b) => b-a);
    //         console.log("man..........", man)
    //     }
    // }
    orderDate = (rowdata)=>{
        console.log("hit on order date....");
        var isoDateTime = new Date(rowdata.orderdate);
        var localDateTime = isoDateTime. toLocaleDateString() + " " + isoDateTime. toLocaleTimeString();
        this.arr.push(rowdata.orderid);
        return localDateTime;
    }
    render(){
        console.log("render", this.state.OrderHistoryInfo);
        return(
            <div>
                <TopNav />
                <h1>{localStorage.getItem("username")}, Your Order history</h1>
                <div className="grid">      
                    <div className="col-12 md:col-12">
                        <Toast ref={(el) => (this.toast = el)} />
                            <div className="datatable-templating-demo">
                                <DataTable 
                                value={this.state.OrderHistoryInfo}
                                selectionMode="single"
                                header="History"
                                sortOrder={-1}
                              >                                    
                                    <Column field="productname" header="Name" />
                                    <Column header="productimage" body={this.imageBodyTemplate} />
                                    <Column field="productquantiy" header="Quantity" />
                                    <Column field="totalamount" header="Total Amount" />
                                    <Column field="paymentmethod" header = "Payment" />
                                    <Column header = "Date"  body = {this.orderDate} />
                                    <Column header="Status" body={this.statusBodyTemplate}/>
                                    <Column field="" header="Order" body={this.showIcon} />
                                </DataTable>
                            </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderHistory;