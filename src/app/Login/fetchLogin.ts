// fetchLogin.ts

interface LoginResponse {
    message?: string;
    error? :string,
    token?: string;
}

export const fetchLogin = async (email: string, password: string, ): Promise<LoginResponse> => {
    try {
        const response = await fetch("https://library-management-rqkq.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data: LoginResponse = await response.json();

        if (!response.ok) {
            // Handle non-200 responses (e.g., invalid credentials)
            throw new Error(data.message || data.error || "Login failed");
        }

        return data; // Return the response (including token)
    } catch (error: unknown) {
        // First, check if the error is an instance of Error
        if (error instanceof Error) {
            console.error("Login error:", error);
            throw new Error(error.message || "Something went wrong. Please try again.");
        } else {
            console.error("Unexpected error:", error);
            throw new Error("Something went wrong. Please try again.");
        }
    }    
};
