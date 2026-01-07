'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface ApiEndpoint {
  method: string
  path: string
  description: string
  baseUrl: string
  parameters?: {
    name: string
    type: string
    description: string
    required: boolean
  }[]
  response: {
    structure: any
    example: any
  }
}

const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/items/devlog',
    description: 'Mengambil data devlog dari blog. Menampilkan semua entri devlog dengan informasi task, project, PIC, dan waktu kerja.',
    baseUrl: 'https://blog.kerjabaik.ai',
    response: {
      structure: {
        data: [
          {
            id: 'string (UUID)',
            status: 'string',
            sort: 'number | null',
            user_created: 'string (UUID)',
            date_created: 'string (ISO 8601)',
            user_updated: 'string (UUID) | null',
            date_updated: 'string (ISO 8601) | null',
            Task: 'string',
            project: 'string',
            pic: 'string',
            jam_mulai: 'string (HH:mm:ss)',
            jam_selesai: 'string (HH:mm:ss)',
            tanggal: 'string (YYYY-MM-DD)'
          }
        ]
      },
      example: {
        data: [
          {
            id: "3c83e404-af14-4907-bd1f-f7760060cf4d",
            status: "done",
            sort: null,
            user_created: "3a7d37fd-964a-4f9c-9ef9-f17b844ff643",
            date_created: "2026-01-06T10:57:01.148Z",
            user_updated: null,
            date_updated: null,
            Task: "Berhasil melakuakan deploy database dari supabase ke vps menggunakan docker, berhasil membuat sub domain di vps, berhasil membuat akses backend ke directus cms melalui dokploy, berhasil memanggil data di directus, membuat akun admin sementara di directus",
            project: "Belajar & Eksplorisasi",
            pic: "Kesya",
            jam_mulai: "08:00:00",
            jam_selesai: "17:00:00",
            tanggal: "2026-01-06"
          }
        ]
      }
    }
  }
]

export default function Home() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(apiEndpoints[0])
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return '#10B981'
      case 'POST':
        return '#3B82F6'
      case 'PUT':
        return '#F59E0B'
      case 'DELETE':
        return '#EF4444'
      default:
        return '#6B7280'
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.titleRed}>Blog</span> Kerjabaik AI
          </h1>
          <p className={styles.subtitle}>API Documentation</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Endpoints</h2>
          <nav className={styles.nav}>
            {apiEndpoints.map((endpoint, index) => (
              <button
                key={index}
                className={`${styles.navItem} ${selectedEndpoint?.path === endpoint.path ? styles.navItemActive : ''}`}
                onClick={() => setSelectedEndpoint(endpoint)}
              >
                <span
                  className={styles.methodBadge}
                  style={{ backgroundColor: getMethodColor(endpoint.method) }}
                >
                  {endpoint.method}
                </span>
                <span className={styles.navPath}>{endpoint.path}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.content}>
          {selectedEndpoint && (
            <div className={styles.endpointDetail}>
              <div className={styles.endpointHeader}>
                <div className={styles.endpointMethod}>
                  <span
                    className={styles.methodTag}
                    style={{ backgroundColor: getMethodColor(selectedEndpoint.method) }}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <code className={styles.endpointPath}>
                    {selectedEndpoint.baseUrl}{selectedEndpoint.path}
                  </code>
                  <button
                    className={styles.copyButton}
                    onClick={() => copyToClipboard(`${selectedEndpoint.baseUrl}${selectedEndpoint.path}`, 'url')}
                    title="Copy URL"
                  >
                    {copied === 'url' ? '✓' : '📋'}
                  </button>
                </div>
                <p className={styles.endpointDescription}>{selectedEndpoint.description}</p>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Response Structure</h3>
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span>JSON Structure</span>
                    <button
                      className={styles.copyButton}
                      onClick={() => copyToClipboard(JSON.stringify(selectedEndpoint.response.structure, null, 2), 'structure')}
                    >
                      {copied === 'structure' ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <pre>
                    <code>{JSON.stringify(selectedEndpoint.response.structure, null, 2)}</code>
                  </pre>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Example Response</h3>
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span>JSON Example</span>
                    <button
                      className={styles.copyButton}
                      onClick={() => copyToClipboard(JSON.stringify(selectedEndpoint.response.example, null, 2), 'example')}
                    >
                      {copied === 'example' ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <pre>
                    <code>{JSON.stringify(selectedEndpoint.response.example, null, 2)}</code>
                  </pre>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Field Descriptions</h3>
                <div className={styles.fieldTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>id</code></td>
                        <td>string (UUID)</td>
                        <td>Unique identifier untuk setiap entri devlog</td>
                      </tr>
                      <tr>
                        <td><code>status</code></td>
                        <td>string</td>
                        <td>Status dari task (contoh: "done", "in_progress", dll)</td>
                      </tr>
                      <tr>
                        <td><code>sort</code></td>
                        <td>number | null</td>
                        <td>Urutan sorting untuk entri</td>
                      </tr>
                      <tr>
                        <td><code>user_created</code></td>
                        <td>string (UUID)</td>
                        <td>ID user yang membuat entri</td>
                      </tr>
                      <tr>
                        <td><code>date_created</code></td>
                        <td>string (ISO 8601)</td>
                        <td>Tanggal dan waktu pembuatan entri</td>
                      </tr>
                      <tr>
                        <td><code>user_updated</code></td>
                        <td>string (UUID) | null</td>
                        <td>ID user yang terakhir mengupdate entri</td>
                      </tr>
                      <tr>
                        <td><code>date_updated</code></td>
                        <td>string (ISO 8601) | null</td>
                        <td>Tanggal dan waktu update terakhir</td>
                      </tr>
                      <tr>
                        <td><code>Task</code></td>
                        <td>string</td>
                        <td>Deskripsi task yang dikerjakan</td>
                      </tr>
                      <tr>
                        <td><code>project</code></td>
                        <td>string</td>
                        <td>Nama project terkait</td>
                      </tr>
                      <tr>
                        <td><code>pic</code></td>
                        <td>string</td>
                        <td>Person in Charge (PIC) untuk task tersebut</td>
                      </tr>
                      <tr>
                        <td><code>jam_mulai</code></td>
                        <td>string (HH:mm:ss)</td>
                        <td>Waktu mulai kerja dalam format 24 jam</td>
                      </tr>
                      <tr>
                        <td><code>jam_selesai</code></td>
                        <td>string (HH:mm:ss)</td>
                        <td>Waktu selesai kerja dalam format 24 jam</td>
                      </tr>
                      <tr>
                        <td><code>tanggal</code></td>
                        <td>string (YYYY-MM-DD)</td>
                        <td>Tanggal kerja dalam format ISO date</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Usage Example</h3>
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span>JavaScript / Fetch</span>
                    <button
                      className={styles.copyButton}
                      onClick={() => {
                        const code = `fetch('${selectedEndpoint.baseUrl}${selectedEndpoint.path}')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Handle the data
  })
  .catch(error => {
    console.error('Error:', error);
  });`
                        copyToClipboard(code, 'usage')
                      }}
                    >
                      {copied === 'usage' ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <pre>
                    <code>{`fetch('${selectedEndpoint.baseUrl}${selectedEndpoint.path}')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Handle the data
  })
  .catch(error => {
    console.error('Error:', error);
  });`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Blog Kerjabaik AI - API Documentation</p>
      </footer>
    </div>
  )
}

