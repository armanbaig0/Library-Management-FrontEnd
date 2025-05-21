// src/app/signupotp/fetchapi.ts
import axios from "axios";

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post("http://localhost:5000/user/verify-otp", {
      email,
      otp,
    });
    return response.data; // { success: true, msg: "User Verified Successfully" }
  } catch (error: unknown) {
   if (error instanceof Error) {
            console.error("OTP error:", error);
            throw new Error(error.message || "Something went wrong. Please try again.");
        } else {
            console.error("Unexpected error:", error);
            throw new Error("Something went wrong. Please try again.");
        }
  }
};
