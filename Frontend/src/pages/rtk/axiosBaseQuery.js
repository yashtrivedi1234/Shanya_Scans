import { toast } from "sonner";  // ✅ Notifications के लिए
import axios from "axios";

// ✅ Axios Instance बनाना (Base URL सेट करना)
export const axiosInstance = axios.create({
    baseURL: "https://dbsanya.drmanasaggarwal.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Custom Axios Base Query for RTK Query
const axiosBaseQuery = async ({ url, method, data }) => {
    try {
        const response = await axiosInstance({
            url,
            method,
            data,
        });

        response?.data?.message && toast.success(response?.data?.message); // ✅ Success Toast
        return { data: response.data };
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong"); // ✅ Error Toast
        return {
            error: {
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
            },
        };
    }
};

export default axiosBaseQuery;
