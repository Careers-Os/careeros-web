/**
 * FE-001 — Auth API client
 * Connects to careeros-api /api/auth/* endpoints
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
  targetRole: string | null
  targetCompanies: string[]
  experienceLevel: string | null
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserResponse
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string>
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json()
  if (!res.ok) {
    throw data as ApiError
  }
  return data as T
}

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse<AuthResponse>(res)
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse<AuthResponse>(res)
}
