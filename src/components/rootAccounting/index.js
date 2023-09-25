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
    render(){
        return(<div>
            <RootTopNav />
            <h2>Welcome to account section</h2>
            <div className="grid">
                <div className="col-12  md:col-6">
                    <p>Select date to calculate total sell</p>
                    <h2>Todays total profit</h2>
                    <p>select * from table where status = 'confirm'</p>
                </div>
                <div className="col-12 md:col-6">
                    <h2>Total product buy price</h2>
                    <h2>Total profit after sell </h2>
                </div>
            </div>
        </div>)
    }
}
export default RootAccounting;