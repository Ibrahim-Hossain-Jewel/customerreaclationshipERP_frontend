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
    containsOnlyNumbers = (str)=>{
        return /^\d+$/.test(str);
    }
    inputValueHandler = (evt)=>{
        this.setState({arrayValue: evt.target.value});
    }
    searchValueHandler = (evt)=>{
        this.setState({searchValue: evt.target.value});
    }
    SubmitSearchHandler = (evt)=>{
        let InputArray = this.state.arrayValue;
        //Array manipulation.
        let arrayCommaSeperated = InputArray.toString().split(",").sort((small,big)=> big-small).toString();
        let arrayJoined = InputArray.toString().split(",").join("");
        let checkSolidNumberInputArray = this.containsOnlyNumbers(arrayJoined);
        //Generate time & date
        let timeObject = new Date();
        let exactTime = timeObject.getFullYear() +"-"+ timeObject.getMonth() + "-" +timeObject.getDate() + " "+ timeObject.getHours() + ":" + timeObject.getMinutes() + ":" + timeObject.getSeconds();
        let basicData = {
            userid: localStorage.getItem("userid"),
            inputArray: arrayCommaSeperated,
            timeStamp: exactTime
        }
        //firstly call the input values 
        let searchValueLengthCheck = this.state.searchValue.toString().split(",").length;
        let searchValueCheckIntegerOrNot = this.containsOnlyNumbers(this.state.searchValue);
        
        if(searchValueLengthCheck<2){
            //check the input value is integer or not?
            if(checkSolidNumberInputArray && searchValueCheckIntegerOrNot){
                //post the input values.
                axios.post("http://localhost:9999/Khoj", basicData).then(e=> {
                    //fetch all data after submit the input Values.
                    axios.get("http://localhost:9999/khojoutput").then((e)=> {
                        this.setState({khojOutput: e.data});
                        
                        e.data.map((eachObj, index)=>{
                            if(eachObj.userid == localStorage.getItem("userid")){
                                let outputArray = eachObj.inputarray.split(",");
                                for(let i = 0; i<outputArray.length; i++){
                                    if (outputArray[i] == this.state.searchValue) {
                                        this.setState({result: "true"});
                                        break;
                                    }else{
                                        this.setState({result: "false"});
                                    }
                                }
                            }
                        })
                    });
                });
            }else{
                this.toast.show({
                    severity:'warn',
                    summary: 'Input Value',
                    detail: "Input value must be Integer!",
                    life: 3000});
            }
            
        }else{
            this.toast.show({
                severity:'warn',
                summary: 'Limit exceeded ',
                detail: "Search value length excedded!",
                life: 3000});
        }
        //Perform result operation.
        
    }
    render(){
        return(<div>
            <TopNav />
            {/*userid received from login page after api success*/}
            <h1>Welcome khoja shes the search page user ID: {localStorage.getItem("userid")}</h1>
            <div>
                
                <div className="grid  sm:col-12">
                <Toast ref={(el) => (this.toast = el)} />
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">Input values</span>
                            <InputText
                                placeholder="Enter your possible values"
                                onChange={this.inputValueHandler}
                                
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">Search values</span>
                            <InputText
                            onChange={this.searchValueHandler}
                            placeholder="Enter to find a specific value"
                           
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                            <Button
                                label="Khoj"
                                icon="pi pi-check"
                                iconPos="right"
                                onClick={this.SubmitSearchHandler}
                            />
                        </div>
                    </div>
                </div>
                <h2>Result: {this.state.result}</h2>
            </div>
        </div>);
    }
}
export default Search;