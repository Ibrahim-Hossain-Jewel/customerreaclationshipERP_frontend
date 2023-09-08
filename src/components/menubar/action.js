import { PROFILEADDRESS, PROFILEID, PROFILEIMAGE, PROFILEMOBILE, PROFILENAME } from "./constant";

export const setProfileImage = (image)=>{
    return {
      type: PROFILEIMAGE,
      payload: image,
    };
}
export const setProfileName = (name) =>{
  return{
    type: PROFILENAME,
    payload: name,
  }
}
export const setProfileAddress = (address) =>{
  return{
    type: PROFILEADDRESS,
    payload: address
  }
}
export const setProfileMobile = (number) =>{
  return{
    type: PROFILEMOBILE,
    payload: number
  }
}
export const setProfileId = (id)=>{
  return{
    type: PROFILEID,
    payload: id
  }
}