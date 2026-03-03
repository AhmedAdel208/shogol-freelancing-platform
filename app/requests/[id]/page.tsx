// "use client";

// import { useEffect, useState } from "react";
// import { requestsService } from "@/lib/api/requests";

// export default function RequestsPage() {
//   const [data, setData] = useState(null);

//   async function fetchRequests() {
//     try {
//       const response = await requestsService.fetchMyRequests();
//       console.log("Full response:", response.data); // Remove this line in production 
    
      
//       // Axios returns the full response, data is in response.data
//       setData(response.data);
//     } catch (error: any) {
//       console.error("Error fetching requests:", error);
//       console.error("Error details:", {
//         message: error.message,
//         status: error.status,
//         response: error.response,
//         isBackendError: error.isBackendError,
//         errors: error.errors
//       });
//     }
//   } 

//   useEffect(() => {
//     fetchRequests();
//   }, []);
//   return (
//     <div>
//       <h1>Requests</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }