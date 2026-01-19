import { getProject } from '@/lib/projects'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

interface PageProps {
  params: {
    projectId: string
  }
}

export default function ProjectOverviewPage({ params }: PageProps) {
  const project = getProject(params.projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.description}>{project.description}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tech Stack</h2>
        <div className={styles.techStack}>
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Base URLs</h2>
        <div className={styles.urls}>
          <div className={styles.urlItem}>
            <span className={styles.urlLabel}>Local:</span>
            <code className={styles.urlValue}>{project.baseUrl.local}</code>
          </div>
          <div className={styles.urlItem}>
            <span className={styles.urlLabel}>Staging:</span>
            <code className={styles.urlValue}>{project.baseUrl.staging}</code>
          </div>
          <div className={styles.urlItem}>
            <span className={styles.urlLabel}>Production:</span>
            <code className={styles.urlValue}>{project.baseUrl.production}</code>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Authentication</h2>
        {project.authentication ? (
          <>
            <p className={styles.text}>
              <strong>Type:</strong> {project.authentication.type}
            </p>
            <p className={styles.text}>{project.authentication.description}</p>
            {project.authentication.example && (
              <pre className={styles.codeBlock}>
                <code>{project.authentication.example}</code>
              </pre>
            )}
          </>
        ) : (
          <p className={styles.emptyText}>Informasi authentication belum tersedia.</p>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>API Groups</h2>
        {project.apiGroups && project.apiGroups.length > 0 ? (
          <div className={styles.groups}>
            {project.apiGroups.map((group) => (
              <div key={group.id} className={styles.groupCard}>
                <h3 className={styles.groupName}>{group.name}</h3>
                {group.description && (
                  <p className={styles.groupDescription}>{group.description}</p>
                )}
                <p className={styles.endpointCount}>
                  {group.endpoints.length} endpoint{group.endpoints.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>Belum ada API groups yang tersedia.</p>
        )}
      </div>
    </div>
  )
}
