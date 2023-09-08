import { ENDUSEREMAIL } from "./constants";
var initialState = {
    endUserEmail: '',
    endUserProfileStatus: false,

}
export const loginReducer = (state = initialState, action)=>{
    switch (action.type) {
      case action.type:
    return{...state, endUserEmail:action.payload}
      case action.type:
    return{...state, endUserProfileStatus: action.payload}
    
      default:
        return state;
    }
}