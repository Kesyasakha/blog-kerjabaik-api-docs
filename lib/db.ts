import bcrypt from 'bcryptjs'

export interface UserRecord {
  id: string
  email: string
  password: string
  role: 'developer'
}

// Simple in-memory database (replace with real DB in production)
// For production, use PostgreSQL, MySQL, or MongoDB
let users: UserRecord[] = []

// Seed initial users (run this once)
export async function seedUsers() {
  if (users.length > 0) return // Already seeded
  
  const hashedPassword = await bcrypt.hash('developer123', 10)
  
  users = [
    {
      id: '1',
      email: 'developer@kerjabaik.dev',
      password: hashedPassword,
      role: 'developer'
    }
  ]
  
  console.log('Users seeded successfully')
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  await seedUsers()
  return users.find(u => u.email === email) || null
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  await seedUsers()
  return users.find(u => u.id === id) || null
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
