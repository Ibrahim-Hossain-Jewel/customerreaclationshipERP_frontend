import React from "react";
import TopNav from "../menubar/TopNav";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { InputNumber } from 'primereact/inputnumber';
import { number } from "prop-types";

class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            arrayValue: '',
            searchValue: '',
            khojOutput: '',
            result: "",
        }
    }
    //containonlyNumber function check is it integer number or not.
    containsOnlyNumbers = (str)=>{
        return /^\d+$/.test(str);
    }
    inputValueHandler = (evt)=>{
        this.setState({arrayValue: evt.target.value});
    }
    searchValueHandler = (evt)=>{
        this.setState({searchValue: evt.target.value});
    }
    render(){
        return(<div>
            <TopNav />
            {/*userid received from login page after api success*/}
            <h1>Welcome & check your product before received! : {localStorage.getItem("userid")}</h1>
            <div>
                
                <div className="grid  sm:col-12">
                <Toast ref={(el) => (this.toast = el)} />
                    <div className="col-12 md:col-12">
                    </div>
                    <div className="col-12 md:col-12">
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        
                    </div>
                </div>
            </div>);
    }
}
export default Search;