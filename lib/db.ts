import bcrypt from 'bcryptjs'

// Simple password check
const CORRECT_PASSWORD = 'devkerjabaik99'
let hashedPassword: string | null = null

// Hash password once
export async function getHashedPassword(): Promise<string> {
  if (!hashedPassword) {
    hashedPassword = await bcrypt.hash(CORRECT_PASSWORD, 10)
  }
  return hashedPassword
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hashed = await getHashedPassword()
  return bcrypt.compare(password, hashed)
}
