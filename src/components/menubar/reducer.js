var initialState = {
    profileImage: '',
    profileName: '',
    profileUserId: '',
    profileAddress: '',
    profileMobileNumber: '',
    profileEmail:''
}

export const profileReducer = (state = initialState, action)=>{
    switch (action.type) {
      case action.type:
    return{...state, profileImage:action.payload}
      default:
        return state;
    }
}