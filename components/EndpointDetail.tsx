'use client'

import { useState } from 'react'
import { Project, ApiEndpoint } from '@/lib/projects'
import styles from './EndpointDetail.module.css'

interface EndpointDetailProps {
  project: Project
  endpoint: ApiEndpoint
}

export default function EndpointDetail({ project, endpoint }: EndpointDetailProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedEnv, setSelectedEnv] = useState<'local' | 'staging' | 'production'>('production')

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return '#10B981'
      case 'POST': return '#3B82F6'
      case 'PUT': return '#F59E0B'
      case 'PATCH': return '#F59E0B'
      case 'DELETE': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getFullUrl = () => {
    const baseUrl = project.baseUrl[selectedEnv]
    return `${baseUrl}${endpoint.path}`
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.methodAndPath}>
          <span
            className={styles.methodBadge}
            style={{ backgroundColor: getMethodColor(endpoint.method) }}
          >
            {endpoint.method}
          </span>
          <code className={styles.path}>{endpoint.path}</code>
        </div>
        <p className={styles.description}>{endpoint.description}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Request URL</h2>
        <div className={styles.envSelector}>
          <button
            className={`${styles.envButton} ${selectedEnv === 'local' ? styles.active : ''}`}
            onClick={() => setSelectedEnv('local')}
          >
            Local
          </button>
          <button
            className={`${styles.envButton} ${selectedEnv === 'staging' ? styles.active : ''}`}
            onClick={() => setSelectedEnv('staging')}
          >
            Staging
          </button>
          <button
            className={`${styles.envButton} ${selectedEnv === 'production' ? styles.active : ''}`}
            onClick={() => setSelectedEnv('production')}
          >
            Production
          </button>
        </div>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span>Full URL</span>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(getFullUrl(), 'url')}
            >
              {copied === 'url' ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
          <pre><code>{getFullUrl()}</code></pre>
        </div>
      </div>

      {endpoint.headers && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Headers</h2>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Header</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(endpoint.headers).map(([key, value]) => (
                  <tr key={key}>
                    <td><code>{key}</code></td>
                    <td><code>{value}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {endpoint.queryParams && endpoint.queryParams.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Query Parameters</h2>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoint.queryParams.map((param) => (
                  <tr key={param.name}>
                    <td><code>{param.name}</code></td>
                    <td><span className={styles.typeTag}>{param.type}</span></td>
                    <td>{param.required ? 'Yes' : 'No'}</td>
                    <td>{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {endpoint.requestBody && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Request Body</h2>
          <p className={styles.contentType}>
            Content-Type: <code>{endpoint.requestBody.contentType}</code>
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Schema</span>
              <button
                className={styles.copyButton}
                onClick={() => copyToClipboard(JSON.stringify(endpoint.requestBody?.schema, null, 2), 'schema')}
              >
                {copied === 'schema' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <pre><code>{JSON.stringify(endpoint.requestBody?.schema, null, 2)}</code></pre>
          </div>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Example</span>
              <button
                className={styles.copyButton}
                onClick={() => copyToClipboard(JSON.stringify(endpoint.requestBody?.example, null, 2), 'example')}
              >
                {copied === 'example' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <pre><code>{JSON.stringify(endpoint.requestBody?.example, null, 2)}</code></pre>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Response</h2>
        <p className={styles.statusCode}>
          Status Code: <code>{endpoint.response.status}</code>
        </p>
        <p className={styles.contentType}>
          Content-Type: <code>{endpoint.response.contentType}</code>
        </p>
        {typeof endpoint.response.schema === 'string' ? (
          <p className={styles.text}>{endpoint.response.schema}</p>
        ) : (
          <>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span>Schema</span>
                <button
                  className={styles.copyButton}
                  onClick={() => copyToClipboard(JSON.stringify(endpoint.response.schema, null, 2), 'response-schema')}
                >
                  {copied === 'response-schema' ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
              <pre><code>{JSON.stringify(endpoint.response.schema, null, 2)}</code></pre>
            </div>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span>Example</span>
                <button
                  className={styles.copyButton}
                  onClick={() => copyToClipboard(JSON.stringify(endpoint.response.example, null, 2), 'response-example')}
                >
                  {copied === 'response-example' ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
              <pre><code>{JSON.stringify(endpoint.response.example, null, 2)}</code></pre>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
