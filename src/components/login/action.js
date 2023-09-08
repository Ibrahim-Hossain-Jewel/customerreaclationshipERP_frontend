import { ENDUSEREMAIL, ENDUSERPROFILESTATUS } from "./constants";
export const setEndUserEmail = (email)=>{
    return {
      type: ENDUSEREMAIL,
      payload: email,
    };
}
export const setEndUserProfileStatus = (status)=>{
  return {
    type: ENDUSERPROFILESTATUS,
    payload: status,
  };
}
