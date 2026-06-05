import { apiClient } from "./client";
import { JobApplication } from "@/types";

export const jobsApi = {
  list: () => apiClient.get<JobApplication[]>("/api/jobs/applications"),
  create: (data: Partial<JobApplication>) => apiClient.post<JobApplication>("/api/jobs/applications", data),
  update: (id: string, data: Partial<JobApplication>) => apiClient.put<JobApplication>(`/api/jobs/applications/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/jobs/applications/${id}`),
  updateStatus: (id: string, status: JobApplication["status"]) =>
    apiClient.patch(`/api/jobs/applications/${id}/status`, { status }),
};
