"use client";
import React from "react";
import { useFormik } from "formik";
import forgotSchema from './ForgotSchema';
import { forgotPassword } from "./ForgotPasswordAPI";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

{/* Yup Validation */ }
const initialValues = {
    email: "",
}

{/*Formic Validation */ }
export default function Forgot() {
    const router = useRouter();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        // declaring two variables initialvalues for Formik and validationSchema for Yup  
        initialValues: initialValues,
        validationSchema: forgotSchema,

        onSubmit: async (values) => {  // callback function passing argument "values"
            try{
                const {email} = values;
                const response = await forgotPassword(email);
                if(response.success){
                    await Swal.fire({
                        toast: true,
                        position: 'top-end',    // top-right corner
                        icon: 'success',
                        title: 'OTP Sent! Please check your email.',
                        showConfirmButton: false,
                        timer: 3000,            // 5 seconds
                        timerProgressBar: true, // green line animation
                });
                    localStorage.setItem("ForgotEmail", values.email);
                    router.push("/ForgotPasswordOtp")
                }else{
                    await Swal.fire({
                        title: 'Error',
                        text: response.msg || 'Email verification failed.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                // temporary adding email to localstorage for otp verification
                localStorage.setItem("ChangePassEmail", values.email);
            }catch(error){
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

                {/*Form for Forgot Password */}
                <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-200 w-full rounded-lg">
                    <h2 className="text-2xl p-2 font-bold mb-6 text-center text-gray-800">Enter your Email</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Div for Getting Email */}
                        <div className="">
                            <label htmlFor="email"
                                className="block text-gray-700 font-medium mb-1">Email</label>
                            <input type="email"
                                id="email"
                                name="email"
                                placeholder="exampe@email.com"
                                autoComplete="off"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-400"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange} />

                            {errors.email && touched.email ? (
                                <p className="form-error text-red-500 text-sm mt-1">{errors.email}</p>
                            ) : null}
                        </div>


                        {/*Recover Button */}
                        <button type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 
                         rounded-lg transition duration-300 cursor-pointer"
                        >Recover Your Account
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