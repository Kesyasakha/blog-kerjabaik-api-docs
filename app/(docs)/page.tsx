import { getAllProjects } from '@/lib/projects'
import Link from 'next/link'
import styles from './page.module.css'

export default function HomePage() {
  const projects = getAllProjects()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>API Documentation</h1>
      <p className={styles.subtitle}>
        Internal documentation for all API projects
      </p>

      <div className={styles.projects}>
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={styles.projectCard}
          >
            <h2 className={styles.projectName}>{project.name}</h2>
            <p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
