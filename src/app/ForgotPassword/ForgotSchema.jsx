import * as Yup from "yup"; // importing all the data from yup using * and givin an alise name for it like Yup 
// now we have all the data from form in Yup 

export const forgotSchema = Yup.object({
    email : Yup.string().email("*Email must be valid email").required("*Email is Required")
});

export default forgotSchema;

