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
 
class RootAccounting extends React.Component{
    constructor(){
        super();
        this.state = {
            fromdate: '',
            todate: '',
            selectedDateTotalProfit: 0,
            profitcustomer: 0,
            totalproductsoldbuyprice: 0,
            totalproductbuyprice: 0,
            sellprice: 0
        }
    }
    onSubmitTodateFromDate = (e)=>{
        let basicData = {
            fromdate: this.state.fromdate,
            todate: this.state.todate,
        }
        console.log("basic data....", basicData);
        axios.get(`http://localhost:8888/selectorderlistbytodatefromdate?fromdate=${basicData.fromdate}&todate=${basicData.todate}`).then((response)=> {
            console.log("selectorderlistbytodatefromdate", response);
            let profit = 0;
            let profitcustomer = 0;
            let totalproductsoldbuyprice = 0;
            let totalproductbuyprice = 0;
            let sellprice = 0;
            for(let i = 0; i<response.data.length; i++){
                if(response.data[i].orderstatus == "Delivered"){
                    console.log("Total confirmed delivered", response.data[i]);
                    profit += parseInt(response.data[i].totalamount) - parseInt((response.data[i].buyprice * response.data[i].productquantiy));
                    profitcustomer+=1; 
                    totalproductsoldbuyprice += parseInt(response.data[i].buyprice*response.data[i].productquantiy);
                }
                totalproductbuyprice += parseInt(response.data[i].buyprice) *parseInt(response.data[i].productquantiy);
                sellprice += parseInt(response.data[i].productquantiy) * parseInt(response.data[i].productprice); 
            }
            this.setState({selectedDateTotalProfit: profit, profitcustomer: profitcustomer, totalproductsoldbuyprice: totalproductsoldbuyprice, totalproductbuyprice: totalproductbuyprice, sellprice: sellprice});
        })
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
    render(){
        console.log(".....selectedDateTotalProfit", this.state.selectedDateTotalProfit);
        console.log('.....profitcustomer', this.state.profitcustomer);
        console.log("......totalproductbuyprice", this.state.totalproductbuyprice);
        console.log("....totalprofitafterallsell", this.state.sellprice);
        return(<div>
            <RootTopNav />
            <h2>Welcome to account section</h2>
            <div className="grid">
                <div className="col-12  md:col-6">
                    <p>Select date to calculate total sell</p>
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
                                <br />
                                    <Button
                                        label="Search"
                                        icon="pi pi-check"
                                        iconPos="right"
                                        onClick={this.onSubmitTodateFromDate}
                                    />
                                </div>
                    </div>
                    <h2>Total Profit {this.state.selectedDateTotalProfit} from {this.state.profitcustomer} Product</h2>
                    <h2>Total product sold buy price {this.state.totalproductsoldbuyprice}</h2>
                </div>
                <div className="col-12 md:col-6">
                    <h2>Total product buy price {this.state.totalproductbuyprice}</h2>
                    <h2>Total profit after all sell {this.state.sellprice-this.state.totalproductbuyprice}</h2>
                </div>
            </div>
        </div>)
    }
}
export default RootAccounting;