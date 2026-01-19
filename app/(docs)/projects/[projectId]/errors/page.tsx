import { getProject } from '@/lib/projects'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

interface PageProps {
  params: {
    projectId: string
  }
}

export default function ErrorsPage({ params }: PageProps) {
  const project = getProject(params.projectId)

  if (!project || !project.errorHandling) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Error Handling</h1>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Common Errors</h2>
        <div className={styles.errors}>
          {project.errorHandling.commonErrors.map((error, index) => (
            <div key={index} className={styles.errorCard}>
              <div className={styles.errorHeader}>
                <span className={styles.statusCode}>{error.status}</span>
                <span className={styles.errorMessage}>{error.message}</span>
              </div>
              <p className={styles.errorDescription}>{error.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
