import { getProject } from '@/lib/projects'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

interface PageProps {
  params: {
    projectId: string
  }
}

export default function AuthenticationPage({ params }: PageProps) {
  const project = getProject(params.projectId)

  if (!project) {
    notFound()
  }

  if (!project.authentication) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Authentication</h1>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            Informasi authentication untuk project ini belum tersedia.
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
      <h1 className={styles.title}>Authentication</h1>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Type</h2>
        <p className={styles.text}>{project.authentication.type}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.text}>{project.authentication.description}</p>
      </div>

      {project.authentication.example && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Example</h2>
          <pre className={styles.codeBlock}>
            <code>{project.authentication.example}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
