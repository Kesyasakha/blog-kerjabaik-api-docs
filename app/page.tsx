'use client'

import { useState } from 'react'
import styles from './page.module.css'

// 1. Update Interface agar tabel field bisa dinamis
interface FieldDefinition {
  name: string
  type: string
  description: string
}

interface ApiEndpoint {
  method: string
  path: string
  description: string
  baseUrl: string
  fields: FieldDefinition[] // Array field untuk tabel dokumentasi
  response: {
    structure: any
    example: any
  }
}

// 2. Data diperbarui sesuai Context Blogpost & Directus
const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/items/Blogpost',
    description: 'Mengambil daftar artikel blog. Gunakan parameter ?fields=*.* untuk relasi lengkap.',
    baseUrl: 'https://api.kerjabaik.ai',
    fields: [
      { name: 'id', type: 'number', description: 'ID unik artikel' },
      { name: 'status', type: 'string', description: 'Status artikel (published/draft)' },
      { name: 'date_created', type: 'string (ISO)', description: 'Waktu pembuatan' },
      { name: 'judul', type: 'string', description: 'Judul artikel blog' },
      { name: 'konten', type: 'string (HTML)', description: 'Isi artikel dalam format HTML' },
      { name: 'image', type: 'string (UUID)', description: 'ID gambar untuk endpoint assets' },
      { name: 'pic', type: 'string', description: 'Penulis atau PIC artikel' }
    ],
    response: {
      structure: {
        data: [
          {
            id: 'number',
            status: 'string',
            date_created: 'string',
            judul: 'string',
            konten: 'string',
            pic: 'string',
            image: 'string (UUID)'
          }
        ]
      },
      example: {
        data: [
          {
            id: 1,
            status: "draft",
            date_created: "2026-01-15T09:11:01.095Z",
            judul: "Mengenal Directus: CMS Rasa Aplikasi Premium",
            konten: "<p>Directus bukan sekadar tempat menyimpan data...</p>",
            pic: "kesya",
            image: "5293054e-991a-440b-a267-b531a180ec18"
          }
        ]
      }
    }
  },
  {
    method: 'GET',
    path: '/assets/:id',
    description: 'Mengambil file gambar berdasarkan UUID yang didapat dari field "image" di Blogpost.',
    baseUrl: 'https://api.kerjabaik.ai',
    fields: [
      { name: ':id', type: 'string (UUID)', description: 'UUID gambar (contoh: 5293054e...)' },
      { name: 'quality', type: 'number (0-100)', description: 'Opsional: Kompresi kualitas gambar' },
      { name: 'width', type: 'number', description: 'Opsional: Resize lebar gambar' }
    ],
    response: {
      structure: 'Binary File (Image)',
      example: 'Displays the image file directly in browser'
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
      case 'GET': return '#10B981'
      case 'POST': return '#3B82F6'
      case 'PUT': return '#F59E0B'
      case 'DELETE': return '#EF4444'
      default: return '#6B7280'
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.titleRed}>Blog</span> Kerjabaik AI
          </h1>
          <p className={styles.subtitle}>Directus API Documentation</p>
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
              {/* Header Section */}
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

              {/* Response Structure */}
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

              {/* Example Response */}
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

              {/* Field Descriptions - DYNAMIC TABLE */}
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
                      {selectedEndpoint.fields.map((field, idx) => (
                        <tr key={idx}>
                          <td><code>{field.name}</code></td>
                          <td>{field.type}</td>
                          <td>{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Usage Example */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Usage Example</h3>
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span>JavaScript / Fetch</span>
                    <button
                      className={styles.copyButton}
                      onClick={() => {
                        const code = `fetch('${selectedEndpoint.baseUrl}${selectedEndpoint.path.replace(':id', '1')}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`
                        copyToClipboard(code, 'usage')
                      }}
                    >
                      {copied === 'usage' ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <pre>
                    <code>{`fetch('${selectedEndpoint.baseUrl}${selectedEndpoint.path.replace(':id', '1')}')
  .then(response => response.json())
  .then(data => {
    console.log(data);
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
