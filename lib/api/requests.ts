import { apiClient } from "./apiClient";

class RequestsAPI {
  async fetchMyRequests() {
    let token: string | null = null;
    
    try {
      // Safely get token
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }
      
      console.log("Token exists:", !!token);
      console.log("Token value:", token && token.length > 0 ? token.substring(0, 20) + "..." : "No token");
      
      // Make API call with additional safety
      const res = await apiClient.get("/JobRequest/my-requests?page=1&pageSize=10");
      return res;
      
    } catch (error: any) {
      console.error("API Error in RequestsAPI - Raw error:", error);
      
      // Handle different error types safely
      if (error && typeof error === 'object') {
        const errorStatus = error.response?.status;
        const errorData = error.response?.data;
        const errorMsg = error.message || error.response?.data?.message || 'Unknown error';
        
        
        // Try alternative endpoint if current one fails
        if (errorStatus === 404) {
          console.log("Trying alternative endpoint...");
          try {
            const altRes = await apiClient.get("/JobRequest/my-requests");
            console.log("Alternative API Response:", altRes);
            return altRes;
          } catch (altError: any) {
            console.error("Alternative endpoint also failed:", altError?.message || altError?.toString() || 'Unknown alternative error');
          }
        }
        
        // Re-throw with safe error object
        throw new Error(errorMsg || 'API request failed');
      } else {
        // Handle non-object errors
        console.error("Non-object error:", String(error));
        throw new Error(String(error));
      }
    }
  }

  // Fetch the Swagger JSON definition for the API
  // static async fetchSwaggerJson() {
  //   const res = await fetch('https://shogol.runasp.net/swagger/v1/swagger.json');
  //   if (!res.ok) throw new Error('Failed to fetch Swagger JSON');
  // }
}

export const requestsService = new RequestsAPI();
