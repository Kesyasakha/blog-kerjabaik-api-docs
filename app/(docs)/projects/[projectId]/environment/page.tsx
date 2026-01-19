import { getProject } from '@/lib/projects'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

interface PageProps {
  params: {
    projectId: string
  }
}

export default function EnvironmentPage({ params }: PageProps) {
  const project = getProject(params.projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Environment</h1>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Base URLs</h2>
        <div className={styles.environments}>
          <div className={styles.envCard}>
            <h3 className={styles.envName}>Local</h3>
            <code className={styles.envUrl}>{project.baseUrl.local}</code>
            <p className={styles.envDescription}>
              Development environment running on your local machine
            </p>
          </div>
          
          <div className={styles.envCard}>
            <h3 className={styles.envName}>Staging</h3>
            <code className={styles.envUrl}>{project.baseUrl.staging}</code>
            <p className={styles.envDescription}>
              Staging environment for testing before production
            </p>
          </div>
          
          <div className={styles.envCard}>
            <h3 className={styles.envName}>Production</h3>
            <code className={styles.envUrl}>{project.baseUrl.production}</code>
            <p className={styles.envDescription}>
              Production environment for live applications
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
