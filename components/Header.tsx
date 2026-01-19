'use client'

import styles from './Header.module.css'

export default function Header() {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/login'
    } catch (error) {
      window.location.href = '/login'
    }
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
        <span className={styles.userEmail}>Developer</span>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  )
}
