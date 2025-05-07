"use client";
import React from "react";
import { useFormik } from "formik";
import { ChangePass } from './FetchApi';
import changeSchema from './ChangeSchema';
import {useRouter} from 'next/navigation';
import Swal from "sweetalert2";

{/* Yup Validation */ }
const initialValues = {
    new_password: "",
    confirm_new_password: "",
}

{/* Formik Validation */ }
export default function OTP() {
    const router = useRouter();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        // declaring two variables initialvalues for Formik and validationSchema for Yup  
        initialValues: initialValues,
        validationSchema: changeSchema,
        onSubmit: async (values) => {  // callback function passing argument "values"
            const email = localStorage.getItem("ChangePassEmail")
                        if(!email){
                            alert("Email not found in local storage.");
                            return;
                        }
                        try{
                            const response = await ChangePass(email, values.new_password);
            
                            if(response.success){
                                await Swal.fire({
                                    toast: true,
                                    position: 'top-end',    // top-right corner
                                    icon: 'success',
                                    title: 'Password Changed. Please Login Again',
                                    showConfirmButton: false,
                                    timer: 3000,            // 5 seconds
                                    timerProgressBar: true, // green line animation
                            });
                                localStorage.removeItem("email")
                                router.push("/Login")
                            }else{
                                alert(response.msg || "Something went wrong while chaning password!");
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

                {/*Form for recover account */}
                <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-200 w-full rounded-lg">
                    <h2 className="text-2xl p-2 font-bold mb-6 text-center text-gray-800">Change Password</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Div for New Password */}
                        <div className="">
                            <label htmlFor="new_password"
                                className=" block text-gray-700 font-medium mb-1">New Password</label>
                            <input type="password"
                                id="new_password"
                                name="new_password"
                                placeholder="********"
                                autoComplete="off"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-400"
                                value={values.new_password}
                                onBlur={handleBlur}
                                onChange={handleChange} />

                            {errors.new_password && touched.new_password ? (
                                <p className="form-error text-red-500 text-sm mt-1">{errors.new_password}</p>
                            ) : null}
                        </div>

                        {/* Div for Getting Confirm-new-Password */}
                        <div className="">
                            <label htmlFor="confirm_new_password"
                                className=" block text-gray-700 font-medium mb-1">Confirm New Password</label>
                            <input type="password"
                                id="confirm_new_password"
                                name="confirm_new_password"
                                placeholder="********"
                                autoComplete="off"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-400"
                                value={values.confirm_new_password}
                                onBlur={handleBlur}
                                onChange={handleChange} />

                            {errors.confirm_new_password && touched.confirm_new_password ? (
                                <p className="form-error text-red-500 text-sm mt-1">{errors.confirm_new_password}</p>
                            ) : null}
                        </div>



                        {/*Verify OTP Button */}
                        <button type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 
                         rounded-lg transition duration-300 cursor-pointer"
                        >Confirm
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