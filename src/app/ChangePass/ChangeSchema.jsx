import * as Yup from "yup";

export const changeSchema = Yup.object({
  
  new_password: Yup.string().min(8,"Must be 8 Character").required("*This is Required"),
  confirm_new_password: Yup.string().min(8,"Must be 8 Character").required("*This is Required")
   .oneOf([Yup.ref('new_password'), null], "Password must match"),

});
  export default changeSchema 