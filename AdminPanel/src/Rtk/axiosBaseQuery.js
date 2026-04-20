import { toast } from "sonner";  // ✅ Notifications 
import axios from "axios";

// ✅ Axios Instance 
export const axiosInstance = axios.create({
    baseURL:"https://db.shanyascans.com/api/v1",
    // baseURL: "http://localhost:5000/api/v1",
    // baseURL:"https://5h8cr5kr-5000.inc1.devtunnels.ms/api/v1",
    
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials:true
});

// ✅ Custom Axios Base Query for RTK Query
const axiosBaseQuery = async ({ url, method, data }) => {
    try {
        console.log("Request Data:", data); // ✅ Debugging

        const response = await axiosInstance({
            url,
            method,
            ...(data instanceof FormData 
                ? { data, headers: { "Content-Type": "multipart/form-data" } }  // ✅ Handles FormData properly
                : { data }
            ),
        });

        console.log(response);
        

        // ✅ Success Toast
        if (response?.data?.message) {
            toast.success(response.data.message);
        }


        return { data: method === "GET" ? response?.data?.data : response?.data };
        
    } catch (error) {
        console.error("Request Error:", error);
        
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
        // toast.error(errorMessage); 

        return {
            error: {
                status: error.response?.status || 500, // ✅ Default to 500 if undefined
                message: errorMessage,
            },
        };
    }
};

export default axiosBaseQuery;
