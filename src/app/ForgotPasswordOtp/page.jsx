"use client";
import React from "react";
import { useFormik } from 'formik';
import {forgotOtp} from "./FetchApi"
import otpSchema from "./OtpSchema";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

{/* Yup Validation */ }
const initialValues = {
    otp: "",
};

export default function OTP() {
    const router = useRouter();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        // declaring two variables initialvalues for Formik and validationSchema for Yup  
        initialValues: initialValues,
        validationSchema: otpSchema,
        onSubmit: async (values) => {  // callback function passing argument "values"
            const email = localStorage.getItem("ForgotEmail")
            if(!email){
                alert("Email not found in local storage.");
                return;
            }
            try{
                const response = await forgotOtp(email, values.otp);

                if(response.success){
                    await Swal.fire({
                        toast: true,
                        position: 'top-end',    // top-right corner
                        icon: 'success',
                        title: 'OTP Verified',
                        showConfirmButton: false,
                        timer: 3000,            // 5 seconds
                        timerProgressBar: true, // green line animation
                });
                    localStorage.removeItem("email")
                    router.push("/ChangePass")
                }else{
                    alert(response.msg || "OTP verification failed.");
                }

            }catch (error) {
                if (error instanceof Error) {
                  alert(error.message);
                } else {
                  alert("Something went wrong");
                }
              }
        },
    });

    return (
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-2">
            <div className="flex w-full max-w-3xl md:flex-row rounded-lg shadow-xl">

                {/*Form for Getting OTP */}
                <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-200 w-full rounded-lg">
                    <h2 className="text-2xl p-2 font-bold mb-6 text-center text-gray-800">Enter 6 digit OTP below</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Div for Getting OTP */}
                        <div className="">
                            <label htmlFor="otp"
                                className="block text-gray-700 font-medium mb-1"></label>
                            <input type="text"
                                id="otp"
                                name="otp"
                                autoComplete="off"
                                placeholder="Enter OTP"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                                  focus:ring-blue-400"
                                value={values.otp}
                                onBlur={handleBlur}
                                onChange={handleChange} />

                            {errors.otp && touched.otp ? (
                                <p className="form-error text-red-500 text-sm mt-1">{errors.otp}</p>
                            ) : null}
                        </div>


                        {/*Verify OTP Button */}
                        <button type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 
                         rounded-lg transition duration-300 cursor-pointer"
                        >Verify
                        </button>

                    </form>
                </div>


                {/* Side Image */}
                <div className="hidden md:block w-xl p-2">
                    <img src="/Pexels.jpg"
                        className="w-fit rounded-lg" />
                </div>
            </div>
        </div>
    );
}