export interface User {
  id: string; name: string; email: string;
  targetRole?: string; targetCompanies?: string[];
  experienceLevel?: "fresher" | "junior" | "mid" | "senior";
  createdAt: string;
}

export interface JobApplication {
  id: string; companyName: string; roleTitle: string;
  status: "wishlist" | "applied" | "screening" | "interview" | "offer" | "rejected";
  appliedDate?: string; jdUrl?: string; notes?: string;
  resumeId?: string; atsScoreAtApply?: number;
}

export interface ApiError { message: string; status: number; errors?: Record<string, string>; }
