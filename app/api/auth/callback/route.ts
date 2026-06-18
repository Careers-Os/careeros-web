import { NextRequest, NextResponse } from 'next/server'

/**
 * OAuth callback handler
 * Called by Google/LinkedIn/GitHub after user approves
 * Exchanges the code for a token via careeros-api
 * Then redirects to dashboard with tokens in cookies
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const provider = searchParams.get('provider')
  const error = searchParams.get('error')

  // User denied OAuth
  if (error || !code || !provider) {
    return NextResponse.redirect(
      new URL(`/login?error=oauth_cancelled`, request.url)
    )
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?provider=${provider}`

    // Exchange code for JWT via careeros-api
    // careeros-api will handle the provider token exchange and return our JWT
    const res = await fetch(`${apiUrl}/api/auth/oauth/${provider}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirectUri }),
    })

    if (!res.ok) {
      throw new Error(`OAuth exchange failed: ${res.status}`)
    }

    const { accessToken, refreshToken } = await res.json()

    // Redirect to dashboard — tokens passed as query params
    // The client-side auth store picks these up and stores them
    const url = new URL('/auth/callback', request.url)
    url.searchParams.set('accessToken', accessToken)
    url.searchParams.set('refreshToken', refreshToken)

    return NextResponse.redirect(url)
  } catch (err) {
    console.error('OAuth callback error:', err)
    return NextResponse.redirect(
      new URL('/login?error=oauth_failed', request.url)
    )
  }
}
