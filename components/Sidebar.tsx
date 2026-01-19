'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { getAllProjects } from '@/lib/projects'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const pathname = usePathname()
  const params = useParams()
  const projects = getAllProjects()
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  const currentProject = projects.find((p) => p.id === params.projectId)
  const isProjectRoute = pathname.includes('/projects/')

  // Auto-expand API section when project is selected
  useEffect(() => {
    if (currentProject) {
      setExpandedGroups((prev) => ({
        ...prev,
        api: true,
      }))
    }
  }, [currentProject?.id])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.logo}>API Docs</h1>
      </div>

      <div className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
        >
          Overview
        </Link>

        {projects.map((project) => (
          <div key={project.id} className={styles.projectSection}>
            <Link
              href={`/projects/${project.id}`}
              className={`${styles.projectLink} ${
                pathname === `/projects/${project.id}` ? styles.active : ''
              }`}
            >
              {project.name}
            </Link>

            {currentProject?.id === project.id && (
              <div className={styles.projectNav}>
                <Link
                  href={`/projects/${project.id}/overview`}
                  className={`${styles.navItem} ${
                    pathname === `/projects/${project.id}/overview` ? styles.active : ''
                  }`}
                >
                  Overview
                </Link>

                {project.authentication && (
                  <Link
                    href={`/projects/${project.id}/authentication`}
                    className={`${styles.navItem} ${
                      pathname === `/projects/${project.id}/authentication` ? styles.active : ''
                    }`}
                  >
                    Authentication
                  </Link>
                )}

                <div className={styles.section}>
                  <button
                    className={styles.sectionHeader}
                    onClick={() => toggleGroup('api')}
                  >
                    <span>API Endpoints</span>
                    <span className={styles.chevron}>
                      {expandedGroups['api'] ? '▼' : '▶'}
                    </span>
                  </button>

                  {expandedGroups['api'] && (
                    <div className={styles.sectionContent}>
                      {project.apiGroups.map((group) => (
                        <div key={group.id} className={styles.subSection}>
                          <button
                            className={styles.subSectionHeader}
                            onClick={() => toggleGroup(group.id)}
                          >
                            <span>{group.name}</span>
                            <span className={styles.chevron}>
                              {expandedGroups[group.id] ? '▼' : '▶'}
                            </span>
                          </button>

                          {expandedGroups[group.id] && (
                            <div className={styles.endpoints}>
                              {group.endpoints.map((endpoint) => (
                                <Link
                                  key={endpoint.id}
                                  href={`/projects/${project.id}/endpoints/${endpoint.id}`}
                                  className={`${styles.endpointItem} ${
                                    pathname ===
                                    `/projects/${project.id}/endpoints/${endpoint.id}`
                                      ? styles.active
                                      : ''
                                  }`}
                                >
                                  <span
                                    className={styles.methodBadge}
                                    data-method={endpoint.method}
                                  >
                                    {endpoint.method}
                                  </span>
                                  <span className={styles.endpointPath}>
                                    {endpoint.path.split('?')[0]}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {project.errorHandling && (
                  <Link
                    href={`/projects/${project.id}/errors`}
                    className={`${styles.navItem} ${
                      pathname === `/projects/${project.id}/errors` ? styles.active : ''
                    }`}
                  >
                    Error Handling
                  </Link>
                )}

                <Link
                  href={`/projects/${project.id}/environment`}
                  className={`${styles.navItem} ${
                    pathname === `/projects/${project.id}/environment` ? styles.active : ''
                  }`}
                >
                  Environment
                </Link>

                {project.changelog && (
                  <Link
                    href={`/projects/${project.id}/changelog`}
                    className={`${styles.navItem} ${
                      pathname === `/projects/${project.id}/changelog` ? styles.active : ''
                    }`}
                  >
                    Changelog
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
