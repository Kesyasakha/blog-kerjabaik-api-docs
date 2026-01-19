'use client'

import { useRouter } from 'next/navigation'
import { User } from '@/lib/auth'
import styles from './Header.module.css'

interface HeaderProps {
  user: User
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search endpoints..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.user}>
        <span className={styles.userEmail}>{user.email}</span>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  )
}
