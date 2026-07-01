// Matches PRD §7.4 — job_applications table schema

export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected";

export interface JobApplication {
  id: string;
  user_id: string;
  company_name: string;
  role_title: string;
  jd_url?: string;
  status: ApplicationStatus;
  applied_date?: string;       // ISO date string e.g. "2025-06-01"
  notes?: string;
  follow_up_date?: string;     // ISO date string
  color?: string;              // hex color indicator
  created_at: string;
  updated_at: string;
}

export interface AddApplicationForm {
  company_name: string;
  role_title: string;
  jd_url: string;
  status: ApplicationStatus;
  applied_date: string;
  notes: string;
  follow_up_date: string;
  color: string;
}