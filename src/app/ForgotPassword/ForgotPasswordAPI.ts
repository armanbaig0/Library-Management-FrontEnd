import axios from "axios";

export const forgotPassword = async (email: string,) => {
  try {
    const response = await axios.post("https://library-management-rqkq.onrender.com/user/forgot-password", {
      email,
    });

    return response.data;
     
  } catch (error: unknown) {
    if (error instanceof Error) {
            console.error("Forgot Passsword Error:", error);
            throw new Error(error.message || "Something went wrong. Please try again.");
        } else {
            console.error("Unexpected error:", error);
            throw new Error("Something went wrong. Please try again.");
        }
  }
};
