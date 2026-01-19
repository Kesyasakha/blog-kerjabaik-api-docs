'use client'

import { useState } from 'react'
import styles from './page.module.css'

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
  fields: FieldDefinition[]
  response: {
    structure: any
    example: any
  }
}

const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/items/Blogpost?fields=*,author.first_name,author.last_name,author.title,author.avatar',
    description: 'Mengambil daftar artikel blog dengan relasi author lengkap dari directus_users.',
    baseUrl: 'https://api.kerjabaik.dev',
    fields: [
      { name: 'id', type: 'integer', description: 'ID unik artikel (auto-increment)' },
      { name: 'status', type: 'string', description: 'Status artikel: "published", "draft", "archived"' },
      { name: 'date_created', type: 'timestamp (ISO 8601)', description: 'Waktu pembuatan artikel (auto-generated)' },
      { name: 'date_updated', type: 'timestamp (ISO 8601)', description: 'Waktu terakhir artikel diupdate' },
      { name: 'user_created', type: 'uuid', description: 'UUID user yang membuat artikel (auto-generated)' },
      { name: 'user_updated', type: 'uuid', description: 'UUID user yang terakhir update artikel' },
      { name: 'tanggal', type: 'date (YYYY-MM-DD)', description: 'Tanggal publikasi artikel yang ditentukan oleh author' },
      { name: 'judul', type: 'string', description: 'Judul artikel blog (max 255 karakter)' },
      { name: 'konten', type: 'text (HTML)', description: 'Isi artikel dalam format HTML dari WYSIWYG editor' },
      { name: 'kategori', type: 'string', description: 'Kategori artikel: "Pemerintahan", "Produk", "Data", "AI", "Kebijakan", "Riset", "Berita", "Teknologi"' },
      { name: 'waktu_baca', type: 'integer', description: 'Estimasi waktu baca dalam MENIT (angka saja, tanpa text). Contoh: 5 berarti "5 menit baca". Frontend perlu menambahkan text " menit baca"' },
      { name: 'image', type: 'uuid', description: 'UUID gambar artikel (relasi ke directus_files). Gunakan endpoint /assets/:id untuk mengambil gambar' },
      { name: 'author', type: 'object (relasi M2O)', description: 'Data author dari directus_users (Many-to-One relation)' },
      { name: 'author.first_name', type: 'string', description: 'Nama depan penulis dari directus_users' },
      { name: 'author.last_name', type: 'string', description: 'Nama belakang penulis dari directus_users' },
      { name: 'author.title', type: 'string', description: 'Jabatan/Role penulis (contoh: "Backend Developer", "Content Writer")' },
      { name: 'author.avatar', type: 'uuid', description: 'UUID avatar penulis (gunakan endpoint /assets/:id)' }
    ],
    response: {
      structure: {
        data: [
          {
            id: 'integer',
            status: 'string',
            date_created: 'timestamp',
            date_updated: 'timestamp',
            user_created: 'uuid',
            user_updated: 'uuid',
            tanggal: 'date',
            judul: 'string',
            konten: 'text (HTML)',
            kategori: 'string',
            waktu_baca: 'integer',
            image: 'uuid',
            author: {
              first_name: 'string',
              last_name: 'string',
              title: 'string',
              avatar: 'uuid'
            }
          }
        ]
      },
      example: {
        data: [
          {
            id: 2,
            status: "published",
            date_created: "2026-01-15T23:46:25.116Z",
            date_updated: "2026-01-19T02:53:36.348Z",
            user_created: "df0f0e5d-fa38-458d-b27f-e33c42d5ec62",
            user_updated: "3a7d37fd-964a-4f9c-9ef9-f17b844ff643",
            tanggal: "2026-01-19",
            judul: "Mengenal Astro: Framework Masa Depan untuk Website Berbasis Konten",
            konten: "<p class=\"svelte-121hp7c\" dir=\"auto\"><strong>Pendahuluan: Mengapa Sih Harus Astro?</strong></p>...",
            kategori: "produk",
            waktu_baca: 5,
            image: "778a9e6d-a3d0-475d-8873-a91966cdcf38",
            author: {
              first_name: "Kesya Sakha Nesya",
              last_name: "Arimawan",
              title: "Backend Developer",
              avatar: "a8b9c1d2-3e4f-5g6h-7i8j-9k0l1m2n3o4p"
            }
          },
          {
            id: 1,
            status: "published",
            date_created: "2026-01-15T09:11:01.095Z",
            date_updated: "2026-01-19T02:53:49.602Z",
            user_created: "3a7d37fd-964a-4f9c-9ef9-f17b844ff643",
            user_updated: "3a7d37fd-964a-4f9c-9ef9-f17b844ff643",
            tanggal: "2026-01-19",
            judul: "Mengenal Directus: CMS Rasa \"Aplikasi Premium\"",
            konten: "<p>Selama ini, mendengar kata \"Database\" atau \"CMS\"...</p>",
            kategori: "produk",
            waktu_baca: 6,
            image: "1a0ce041-1e08-411c-a97a-151a08227097",
            author: {
              first_name: "Putra",
              last_name: "Developer",
              title: "Frontend Developer",
              avatar: "b1c2d3e4-5f6g-7h8i-9j0k-1l2m3n4o5p6q"
            }
          }
        ]
      }
    }
  },
  {
    method: 'GET',
    path: '/assets/:id',
    description: 'Mengambil file gambar/asset berdasarkan UUID. Gunakan UUID dari field "image" atau "author.avatar".',
    baseUrl: 'https://api.kerjabaik.dev',
    fields: [
      { name: ':id', type: 'uuid (required)', description: 'UUID file dari directus_files (contoh: 778a9e6d-a3d0-475d-8873-a91966cdcf38)' },
      { name: 'quality', type: 'integer (0-100)', description: 'Query parameter: Kompresi kualitas gambar. Default: 80. Contoh: ?quality=90' },
      { name: 'width', type: 'integer', description: 'Query parameter: Resize lebar gambar dalam pixel. Contoh: ?width=800' },
      { name: 'height', type: 'integer', description: 'Query parameter: Resize tinggi gambar dalam pixel. Contoh: ?height=600' },
      { name: 'fit', type: 'string', description: 'Query parameter: Mode resize - "cover", "contain", "inside", "outside". Default: "cover"' },
      { name: 'format', type: 'string', description: 'Query parameter: Format output - "jpg", "png", "webp", "avif". Default: original format' }
    ],
    response: {
      structure: 'Binary File (Image/Document)',
      example: 'Returns the actual file content with appropriate Content-Type header. Image is displayed directly in browser.'
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
          <p className={styles.subtitle}>Directus API Documentation - Complete Guide</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>API Endpoints</h2>
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
                <span className={styles.navPath}>
                  {endpoint.path.split('?')[0]}
                </span>
              </button>
            ))}
          </nav>
          
          <div className={styles.sidebarInfo}>
            <h3 className={styles.sidebarInfoTitle}>💡 Quick Tips</h3>
            <ul className={styles.sidebarInfoList}>
              <li><strong>waktu_baca</strong> adalah integer (5 = 5 menit)</li>
              <li><strong>author</strong> adalah relasi ke directus_users</li>
              <li><strong>image</strong> gunakan endpoint /assets/:id</li>
              <li>Gunakan <code>?fields=*,author.*</code> untuk relasi lengkap</li>
            </ul>
          </div>
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

              {/* Field Descriptions - DYNAMIC TABLE */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>📋 Field Descriptions</h3>
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
                          <td><span className={styles.typeTag}>{field.type}</span></td>
                          <td>{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Response Structure */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>🏗️ Response Structure</h3>
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
                <h3 className={styles.sectionTitle}>✨ Example Response (Real Data)</h3>
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

              {/* Usage Example */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>💻 Usage Example (JavaScript/React)</h3>
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span>Fetch API with Display Formatting</span>
                    <button
                      className={styles.copyButton}
                      onClick={() => {
                        const code = selectedEndpoint.path.includes('Blogpost') 
                          ? `// Fetch blog posts with author details
fetch('${selectedEndpoint.baseUrl}${selectedEndpoint.path}')
  .then(response => response.json())
  .then(data => {
    // Format data untuk display
    const articles = data.data.map(article => ({
      ...article,
      // Format waktu baca: 5 → "5 menit baca"
      waktu_baca_display: \`\${article.waktu_baca} menit baca\`,
      
      // Format author lengkap
      author_display: \`\${article.author.first_name} \${article.author.last_name} - \${article.author.title}\`,
      
      // URL gambar artikel
      image_url: \`https://api.kerjabaik.dev/assets/\${article.image}\`,
      
      // URL avatar author
      author_avatar_url: article.author.avatar 
        ? \`https://api.kerjabaik.dev/assets/\${article.author.avatar}\`
        : null
    }));
    
    console.log(articles);
    
    // Contoh render di React:
    // {articles.map(article => (
    //   <div key={article.id}>
    //     <img src={article.image_url} alt={article.judul} />
    //     <h2>{article.judul}</h2>
    //     <span>{article.kategori}</span>
    //     <span>{article.waktu_baca_display}</span>
    //     <div>
    //       <img src={article.author_avatar_url} />
    //       <span>{article.author_display}</span>
    //     </div>
    //   </div>
    // ))}
  })
  .catch(error => console.error('Error:', error));`
                          : `// Fetch image dengan resize
const imageUrl = '${selectedEndpoint.baseUrl}/assets/778a9e6d-a3d0-475d-8873-a91966cdcf38?width=800&quality=90&format=webp';

// Gunakan langsung di <img> tag
<img src={imageUrl} alt="Article thumbnail" />

// Atau fetch sebagai blob untuk processing
fetch(imageUrl)
  .then(response => response.blob())
  .then(blob => {
    const objectUrl = URL.createObjectURL(blob);
    document.querySelector('img').src = objectUrl;
  });`
                        copyToClipboard(code, 'usage')
                      }}
                    >
                      {copied === 'usage' ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <pre>
                    <code>{selectedEndpoint.path.includes('Blogpost') 
                      ? `// Fetch blog posts with author details
fetch('${selectedEndpoint.baseUrl}${selectedEndpoint.path}')
  .then(response => response.json())
  .then(data => {
    // Format data untuk display
    const articles = data.data.map(article => ({
      ...article,
      // Format waktu baca: 5 → "5 menit baca"
      waktu_baca_display: \`\${article.waktu_baca} menit baca\`,
      
      // Format author lengkap
      author_display: \`\${article.author.first_name} \${article.author.last_name} - \${article.author.title}\`,
      
      // URL gambar artikel
      image_url: \`https://api.kerjabaik.dev/assets/\${article.image}\`,
      
      // URL avatar author
      author_avatar_url: article.author.avatar 
        ? \`https://api.kerjabaik.dev/assets/\${article.author.avatar}\`
        : null
    }));
    
    console.log(articles);
  })
  .catch(error => console.error('Error:', error));`
                      : `// Fetch image dengan resize
const imageUrl = '${selectedEndpoint.baseUrl}/assets/778a9e6d-a3d0-475d-8873-a91966cdcf38?width=800&quality=90&format=webp';

// Gunakan langsung di <img> tag
<img src={imageUrl} alt="Article thumbnail" />

// Atau fetch sebagai blob
fetch(imageUrl)
  .then(response => response.blob())
  .then(blob => {
    const objectUrl = URL.createObjectURL(blob);
    document.querySelector('img').src = objectUrl;
  });`
                    }</code>
                  </pre>
                </div>
              </div>
              
              {/* Important Notes */}
              {selectedEndpoint.path.includes('Blogpost') && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>⚠️ Important Notes untuk Frontend</h3>
                  <div className={styles.notesBox}>
                    <ul>
                      <li>
                        <strong>Field <code>waktu_baca</code>:</strong> Nilainya adalah INTEGER (angka saja).
                        <br />
                        Contoh: <code>waktu_baca: 5</code> → Display di frontend: <code>"5 menit baca"</code>
                        <br />
                        Jangan display langsung tanpa tambahan text " menit baca"!
                      </li>
                      <li>
                        <strong>Field <code>author</code>:</strong> Adalah object relasi ke directus_users.
                        <br />
                        Format display yang recommended: <code>"{`${author.first_name} ${author.last_name} - ${author.title}`}"</code>
                      </li>
                      <li>
                        <strong>Field <code>image</code> dan <code>author.avatar</code>:</strong> Berisi UUID.
                        <br />
                        URL lengkap: <code>{`https://api.kerjabaik.dev/assets/${uuid}`}</code>
                        <br />
                        Tambahkan query params untuk optimasi: <code>?width=800&quality=90&format=webp</code>
                      </li>
                      <li>
                        <strong>Field <code>kategori</code>:</strong> Pilihan: "Pemerintahan", "Produk", "Data", "AI", "Kebijakan", "Riset", "Berita", "Teknologi"
                      </li>
                      <li>
                        <strong>Field <code>konten</code>:</strong> HTML content. Gunakan <code>dangerouslySetInnerHTML</code> di React atau sanitize dulu dengan library seperti DOMPurify.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Blog Kerjabaik AI - Complete API Documentation</p>
        <p>Built with ❤️ using Directus Headless CMS</p>
      </footer>
    </div>
  )
}
