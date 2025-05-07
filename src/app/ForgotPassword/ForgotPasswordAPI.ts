import axios from "axios";

export const forgotPassword = async (email: string,) => {
  try {
    const response = await axios.post("http://localhost:5000/user/forgot-password", {
      email,
    });

    return response.data;
     
  } catch (error: any) {
    console.error("Email Verification Error:", error);
    throw new Error(
      error.response?.data?.msg || "An error occurred while verifying Email."
    );
  }
};
