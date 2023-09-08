import { combineReducers } from "redux";
import { loginReducer } from "../components/login/reducer";
import { profileReducer } from "../components/menubar/reducer";
export default combineReducers({ loginReducer, profileReducer});