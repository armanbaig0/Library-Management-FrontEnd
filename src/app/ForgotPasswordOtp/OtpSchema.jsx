import * as Yup from 'yup';

export const otpSchema = Yup.object ({
    
    otp : Yup.string().min(6,"*must be 6 digits").max(6,"*must be 6 digits").required("Otp is required"),

});
 export default otpSchema