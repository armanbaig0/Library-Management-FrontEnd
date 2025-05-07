import axios from "axios";

export const ChangePass = async (email: string, new_password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/user/ChangePass", {
      email,
      new_password,
    });
    return response.data;
  } catch (error) {
    console.error("Change Password error:", error);

    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error((error as { message: string }).message);
    }

    throw new Error("An unexpected error occurred while Changing Password.");
  }
};
