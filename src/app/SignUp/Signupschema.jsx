import * as Yup from "yup"; // importing all the data from yup using * and givin an alise name for it like Yup 
 // now we have all the data from form in Yup 

export  const signUpSchema = Yup.object ({
    fullname: Yup.string().min(8).max(12).required(" * Name is required"),
    email: Yup.string().email("*email must be a valid email").required("* Email is Requireed"),
    password: Yup.string().min(8,'* Password must be 8 characters').required("* Password is Required"),
    confirm_password: Yup.string().required("* This is Required").oneOf([Yup.ref('password'), null], "* Password must match"),
    terms: Yup.string().required("* This must check")
 });
 
 export default signUpSchema