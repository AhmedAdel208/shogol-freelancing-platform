
export class RequestsAPI {
  static async fetchMyRequests(token?: string) {
    const res = await fetch("https://shogol.runasp.net/api/JobRequest/my-requests", {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      credentials: 'include', // If cookies/session needed
    });
    if (!res.ok) throw new Error('Failed to fetch requests');
    return res.json();
  }

  // Fetch the Swagger JSON definition for the API
  static async fetchSwaggerJson() {
    const res = await fetch('https://shogol.runasp.net/swagger/v1/swagger.json');
    if (!res.ok) throw new Error('Failed to fetch Swagger JSON');
    return res.json();
  }
}
