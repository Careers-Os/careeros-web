import { apiClient } from "./client";

export interface Resume {
  id: string; fileName: string; atsScore?: number; createdAt: string; isActive: boolean;
}

export interface AnalysisResult {
  overallScore: number; keywordScore: number; sectionScore: number;
  actionVerbScore: number; quantificationScore: number; formattingScore: number;
  keywordGaps: string[];
  improvements: { priority: "high" | "medium" | "low"; message: string }[];
  status: "pending" | "completed" | "failed";
}

export const resumeApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Resume>("/api/resumes/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  list: () => apiClient.get<Resume[]>("/api/resumes"),
  get: (id: string) => apiClient.get<Resume>(`/api/resumes/${id}`),
  analyze: (id: string) => apiClient.post(`/api/resumes/${id}/analyze`),
  getAnalysis: (id: string) => apiClient.get<AnalysisResult>(`/api/resumes/${id}/analysis`),
  delete: (id: string) => apiClient.delete(`/api/resumes/${id}`),
};
