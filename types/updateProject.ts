export interface UpdateProjectResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface UpdateProjectError {
  message?: string;
  status?: number;
}
