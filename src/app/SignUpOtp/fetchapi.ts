// src/app/signupotp/fetchapi.ts
import axios from "axios";

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post("http://localhost:5000/user/verify-otp", {
      email,
      otp,
    });
    return response.data; // { success: true, msg: "User Verified Successfully" }
  } catch (error: any) {
    console.error("OTP verification error:", error);
    throw new Error(
      error.response?.data?.msg || "An error occurred while verifying OTP."
    );
  }
};
