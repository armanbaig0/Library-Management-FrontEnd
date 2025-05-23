"use client";
import React from "react";
import { fetchLogin } from "./fetchLogin";
import { useFormik } from "formik";
import LoginSchema from "./loginSchema";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Loader from "../../Components/Loader/Loader";

{
  /* Yup Validation */
}
const initialValues = {
  email: "",
  password: "",
};

{
  /* Formik Validation */
}
export default function Login() {
  // using remember me
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      setLoginError("");
      setIsLoading(true);

      try {
        const response = await fetchLogin(values.email, values.password);

        // Store token in localStorage
        if (response.token) {
          // inside onSubmit success block:

          Cookies.set("token", response.token, { path: "/" });
          Cookies.set("role", response.role, { path: "/" });
          Cookies.set("userId", response.user.id, { path: "/" });
          Cookies.set("userFullname", response.user.fullname, { path: "/" });
          Cookies.set("cnic", response.user.cnic, { path: "/" });

          await Swal.fire({
            toast: true,
            position: "top-end", // top-right corner
            icon: "success",
            title: "Login Successfull",
            showConfirmButton: false,
            timer: 3000, // 5 seconds
            timerProgressBar: true, // green line animation
          });

          // store Email and password if remember me is clicked
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", values.email);
            localStorage.setItem("rememberedPassword", values.password);
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
          }

          if (response.role === "Admin") {
            window.location.href = "/Admin";
          } else {
            window.location.href = "/Student";
          }
        } else {
          setLoginError(response.message || response.error || "Login Failed");
        }
      } catch (error) {
        setLoginError(error.message);
      }
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    // Set initial values if "remember me" is checked
    if (rememberedEmail) {
      setFieldValue("email", rememberedEmail);
      setFieldValue("password", rememberedPassword);
      setRememberMe(true);
    }
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-2">
      <div className="flex w-full max-w-3xl md:flex-row rounded-lg shadow-xl">
        {/* Login Form */}
        <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-200 w-full rounded-lg">
          <h2 className="text-2xl p-2 font-bold mb-6 text-center text-gray-800">
            Login Below
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {loginError && (
              <div className="text-red-500 text-sm font-normal">
                {loginError}
              </div>
            )}

            {/* Div for Getting Email */}
            <div className="">
              <label
                htmlFor="email"
                className=" block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exampe@email.com"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />

              {errors.email && touched.email ? (
                <p className="form-error text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              ) : null}
            </div>

            {/* Div for Getting Password */}
            <div className="">
              <label
                htmlFor="password"
                className=" block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {errors.password && touched.password ? (
                <p className="form-error text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              ) : null}
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember-me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <a
                href="/ForgotPassword"
                className="text-sm text-gray-700 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="flex items-center justify-center">
                    <Loader />
                  </span>
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* OR Divider */}
            <div className="flex items-center ">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-small text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Continue with google */}
            <button
              type="button"
              className="w-full animate-pulse border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg flex items-center justify-center space-x-2 transition duration-300 cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>
          </form>
        </div>

        {/* Side Image */}
        <div className="hidden md:block w-xl p-2">
          <img src="/Pexels.jpg" className="w-fit rounded-lg" />
        </div>
      </div>
    </div>
  );
}