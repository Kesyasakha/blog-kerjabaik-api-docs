import { getProject } from '@/lib/projects'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

interface PageProps {
  params: {
    projectId: string
  }
}

export default function ChangelogPage({ params }: PageProps) {
  const project = getProject(params.projectId)

  if (!project) {
    notFound()
  }

  if (!project.changelog || project.changelog.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Changelog</h1>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            Changelog untuk project ini belum tersedia.
          </p>
          <p className={styles.emptySubtext}>
            Section ini akan diupdate segera.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Changelog</h1>
      
      <div className={styles.changelog}>
        {project.changelog.map((entry, index) => (
          <div key={index} className={styles.entry}>
            <div className={styles.entryHeader}>
              <span className={styles.version}>v{entry.version}</span>
              <span className={styles.date}>{entry.date}</span>
            </div>
            <ul className={styles.changes}>
              {entry.changes.map((change, changeIndex) => (
                <li key={changeIndex} className={styles.change}>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
