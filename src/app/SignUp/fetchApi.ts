
export const signupUser = async (formData: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.msg || "Signup failed");
      }
  
      return data;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  };
  