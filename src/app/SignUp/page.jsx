"use client";
import React from "react";
import { signupUser } from "./fetchApi";
import { useFormik } from "formik";
import signUpSchema from './Signupschema';
import Swal from "sweetalert2";


{/* Yup Validation using Schema */}
const initialValues ={
       fullname: "",
       email:"",
       password: "",
       confirm_password: "",
       terms: "",
}; 

{/* Formic Validation */}
export default function SignUp (){
       
       // formik handling form
      const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
              // declaring two variables initialvalues for Formik and validationSchema for Yup  
              initialValues: initialValues, 
              validationSchema: signUpSchema,
              onSubmit : async(values) =>{  // callback function passing argument "values"
                  try{
                    const res = await signupUser({
                            fullname: values.fullname,
                            email: values.email,
                            password: values.password,
                     });
                     await Swal.fire({
                                             toast: true,
                                             position: 'top-end',    // top-right corner
                                             icon: 'success',
                                             title: 'Registered Successfully',
                                             showConfirmButton: false,
                                             timer: 3000,            // 5 seconds
                                             timerProgressBar: true, // green line animation
                                     });
                      // temporary adding email to localstorage for otp verification
                       localStorage.setItem("SignupEmail", values.email);
                      // Redirects to login page after Successful api
                     window.location.href = '/SignUpOtp';
                  }catch (error){
                     Swal.fire({
                            icon: 'error',
                            title: 'Signup Failed',
                            text: err.message,
                          });
                  }
              },
       });
       
console.log(errors);
    return (

       /* Full outer Body Div with gray BG */
       <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-2 ">

         {/* Div for Inner body of form including image */}
        <div className="flex w-full max-w-3xl md:flex-row rounded-lg shadow-xl">
            
           {/* Div For Placing Form */}
           <div className=" bg-gradient-to-br from-gray-50 to-gray-200 w-full rounded-lg p-2  ">
               
            {/* Div for Creating An account Heading */}
            <div className="">
                <h2 className="text-2xl p-2 font-bold text-center mb-6 text-gray-800">Create an Account</h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>

               {/* Div for Getting Name */}
               <div className="">
                   <label htmlFor="name"
                          className=" block text-gray-700 font-medium mb-1">Full Name</label>
                   <input type="text" 
                          id="fullname" 
                          name="fullname"
                          placeholder="John Doe"
                          autoComplete="off"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-400"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}/>

                     { errors.fullname && touched.fullname ? (
                            <p className="form-error text-red-500 text-sm mt-1">{errors.fullname}</p>
                     ) :null}

               </div>

               {/* Div for Getting Email */}
               <div className="">
                   <label htmlFor="email"
                          className=" block text-gray-700 font-medium mb-1">Email</label>
                   <input type="email" 
                          id="email" 
                          name="email"
                          placeholder="exampe@email.com"
                          autoComplete="off"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-400"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}/>

                      { errors.email && touched.email ? (
                            <p className="form-error text-red-500 text-sm mt-1">{errors.email}</p>
                     ) :null}    
               </div>

               {/* Div for Getting Password */}
               <div className="">
                   <label htmlFor="password"
                          className=" block text-gray-700 font-medium mb-1">Password</label>
                   <input type="password" 
                          id="password" 
                          name="password"
                          placeholder="********"
                          autoComplete="off"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-400"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}/>
                     
                     { errors.password && touched.password ? (
                            <p className="form-error text-red-500 text-sm mt-1">{errors.password}</p>
                     ) :null}

               </div>

               {/* Div for Getting Confirm-Password */}
               <div className="">
                   <label htmlFor="confirm-password" 
                          className=" block text-gray-700 font-medium mb-1">Confirm Password</label>
                   <input type="password" 
                          id="confirm-password" 
                          name="confirm_password"
                          placeholder="********"
                          autoComplete="off"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-400"
                          value={values.confirm_password}
                          onChange={handleChange}
                          onBlur={handleBlur}/>
                     
                     { errors.confirm_password && touched.confirm_password ? (
                            <p className="form-error text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                     ) :null}

               </div>
                 
                 {/*Terms and Conditions */}
                 <div className="flex items-center space-x-2">
                    <input type="checkbox" 
                           id="terms"
                           name="terms"
                           className="h-4 w-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                           value={values.terms}
                           onChange={handleChange}
                           onBlur={handleBlur}/>

                     {errors.terms && touched.terms ? (
                            <p className="form-error text-red-500 text-sm mt-1">{errors.terms}</p>
                     ) :null}

                    <label htmlFor="terms"
                           className="text-sm text-gray-700 cursor-pointer">I agree to the 
                        <a href="#" className="text-blue-600 hover:underline cursor-pointer">Terms and Conditions</a>
                    </label>
                 </div>

                 {/*Signup Button */}
                 <button type="submit"
                         className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 
                         rounded-lg transition duration-300 cursor-pointer"
                         >Sign Up
                </button>

                {/*OR Divider */}
                 <div className="flex items-center ">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-3 text-small text-gray-500">or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                 </div>

                 {/* Continue with google */}
                 <button type="button"
                         className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold
                          rounded-lg flex items-center justify-center space-x-2 transition duration-300 cursor-pointer ">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" 
                         alt="Google" className="w-5 h-5" />
                    <span>Continue with Google</span>
                 </button>

                <p className="text-center text-sm text-gray-600 mt-4">Already have an Account?
                    <a href="#" className="text-blue-600 hover:underline">Log In</a>
                </p>
               </form>
           </div>
            </div>

            {/* Div for Placing Image */}
           <div className="p-2 hidden md:block w-xl">
            <img src="/Pexels.jpg"
                 className="w-fit h-full rounded-lg shadow-lg" />
           </div>
        </div>
        </div>
       );
}