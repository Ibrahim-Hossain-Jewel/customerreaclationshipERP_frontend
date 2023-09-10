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
        this.state = {
            OrderHistory: {},
            visible: false,
            deleteRowData: ''
        }
    }
    componentDidMount(){
        console.log("useremail first from component did mount", localStorage.getItem("useremail"));
        axios.get(`http://localhost:8888/orderlist?customeremail=${localStorage.getItem("useremail")}`).then((response)=> {
            this.setState({OrderHistory: response.data})
        })
    }
    imageBodyTemplate = (allproduct)=>{
        return <Image src={`data:image/png;base64,${allproduct.productimage}`} indicatorIcon={<i className="pi pi-check"></i>} alt="Image" preview width="150" height="100"/>
    }
    statusBodyTemplate = (productStatus)=>{
        return productStatus.orderstatus;
    }
    deleteData = (evt, rowData) => {
        console.log("seleted row data...", rowData);
    }
    
    showIcon = (allTableData) => {
        console.log("selected data that you want to delete", allTableData)
        let cartButton = (
          <div>
            {/*delete section && confirm pop up*/}
            <ConfirmPopup  visible={this.state.visible} onHide={this.onChangeSetVisible}
            message="Are you sure you want to delete?" icon="pi pi-exclamation-triangle" accept={this.accept} reject={this.reject} />
            <div className="card flex justify-content-center">
                <Button
                    style={{ marginRight: "10px" }}
                    onClick={(e) => this.onChangeSetVisible(e, allTableData)}
                >
                    Delete
                </Button>
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
            severity: "Delete",
            summary: "Rejected",
            detail: "Delete not accepted!",
            life: 3000,
          });
    };
    onChangeSetVisible =(e, rowData)=>{
        console.log("onchangesetVisible row data", rowData);
        this.setState({visible: !this.state.visible, deleteRowData: rowData});
    }
    orderDate = (rowdata)=>{
        let date = rowdata.orderdate;
        var isoDateTime = new Date(date);
        var localDateTime = isoDateTime. toLocaleDateString() + " " + isoDateTime. toLocaleTimeString();
        return localDateTime;
    }
    render(){
        console.log("useremail first from render");
        return(
            <div>
                <TopNav />
                <h1>{localStorage.getItem("username")}, Your Order history</h1>
                <div className="grid">      
                    <div className="col-12 md:col-12">
                        <Toast ref={(el) => (this.toast = el)} />
                            <div className="datatable-templating-demo">
                                <DataTable 
                                value={this.state.OrderHistory}
                                selectionMode="single"
                                header="History"
                                >                                    
                                    <Column field="productname" header="Name" sortable />
                                    <Column header="productimage" body={this.imageBodyTemplate}/>
                                    <Column field="productquantiy" header="Quantity"/>
                                    <Column field="totalamount" header="Total Amount" />
                                    <Column field="paymentmethod" header = "Payment" />
                                    <Column header = "Date" body = {this.orderDate}/>
                                    <Column header="Status" body={this.statusBodyTemplate} />
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