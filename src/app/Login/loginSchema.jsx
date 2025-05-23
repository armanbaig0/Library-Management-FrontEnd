import * as Yup from "yup"; // importing all the data from yup using * and givin an alise name for it like Yup
// now we have all the data from form in Yup

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("*This must be valid email")
    .required("*Email is required"),
  password: Yup.string()
    .min(8, "*Password must be 8 characters")
    .required("*Password is required"),
});

export default LoginSchema;
