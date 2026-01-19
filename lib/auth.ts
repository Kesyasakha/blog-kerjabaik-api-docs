import { cookies } from 'next/headers'

const SESSION_COOKIE = 'dev-session'
const SESSION_VALUE = 'authenticated'

export interface User {
  id: string
  role: 'developer'
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE)?.value
    
    if (session === SESSION_VALUE) {
      return {
        id: '1',
        role: 'developer'
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function setAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
