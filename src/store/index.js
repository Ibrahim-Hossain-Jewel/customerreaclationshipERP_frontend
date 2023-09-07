import { createStore } from "redux";

const initialState = fromJS({
    isLoading : false,
});

export const CRUDreducer = (state = initialState, action)=>{
    switch (action.type) {
      case UPDATE_RESPONSE:
        return state.set("updateResponse", action.updateResponse);
      default:
        return state;
    }
}