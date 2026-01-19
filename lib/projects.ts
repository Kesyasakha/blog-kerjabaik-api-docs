export interface ApiEndpoint {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  headers?: Record<string, string>
  requestBody?: {
    contentType: string
    schema: any
    example: any
  }
  response: {
    status: number
    contentType: string
    schema: any
    example: any
  }
  queryParams?: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
}

export interface ApiGroup {
  id: string
  name: string
  description?: string
  endpoints: ApiEndpoint[]
}

export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  baseUrl: {
    local: string
    staging: string
    production: string
  }
  authentication?: {
    type: 'Bearer Token' | 'API Key' | 'OAuth2' | 'Basic Auth'
    description: string
    example?: string
  }
  apiGroups: ApiGroup[]
  errorHandling?: {
    commonErrors: Array<{
      status: number
      message: string
      description: string
    }>
  }
  changelog?: Array<{
    date: string
    version: string
    changes: string[]
  }>
}

export const projects: Project[] = [
  {
    id: 'blog-api',
    name: 'Blog API',
    description: 'API untuk manajemen artikel blog dengan relasi author dari Directus CMS.',
    techStack: ['Directus', 'PostgreSQL', 'Node.js'],
    baseUrl: {
      local: 'http://localhost:8055',
      staging: 'https://staging-api.kerjabaik.dev',
      production: 'https://api.kerjabaik.dev',
    },
    authentication: {
      type: 'Bearer Token',
      description: 'Gunakan Bearer token dari Directus untuk mengakses API. Token didapat dari login endpoint.',
      example: 'Authorization: Bearer your-token-here',
    },
    apiGroups: [
      {
        id: 'blogposts',
        name: 'Blog Posts',
        description: 'Endpoints untuk mengelola artikel blog',
        endpoints: [
          {
            id: 'list-blogposts',
            method: 'GET',
            path: '/items/Blogpost',
            description: 'Mengambil daftar artikel blog dengan relasi author lengkap dari directus_users.',
            queryParams: [
              {
                name: 'fields',
                type: 'string',
                required: false,
                description: 'Field yang ingin diambil. Gunakan * untuk semua field, atau spesifik seperti: *,author.first_name,author.last_name',
              },
              {
                name: 'filter',
                type: 'object',
                required: false,
                description: 'Filter untuk memfilter hasil. Contoh: {"status": {"_eq": "published"}}',
              },
              {
                name: 'sort',
                type: 'string',
                required: false,
                description: 'Sorting. Contoh: -date_created untuk descending',
              },
              {
                name: 'limit',
                type: 'number',
                required: false,
                description: 'Jumlah maksimal hasil yang dikembalikan',
              },
            ],
            headers: {
              'Authorization': 'Bearer {token}',
              'Content-Type': 'application/json',
            },
            response: {
              status: 200,
              contentType: 'application/json',
              schema: {
                data: [
                  {
                    id: 'integer',
                    status: 'string',
                    date_created: 'timestamp',
                    date_updated: 'timestamp',
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
                      avatar: 'uuid',
                    },
                  },
                ],
              },
              example: {
                data: [
                  {
                    id: 2,
                    status: 'published',
                    date_created: '2026-01-15T23:46:25.116Z',
                    date_updated: '2026-01-19T02:53:36.348Z',
                    tanggal: '2026-01-19',
                    judul: 'Mengenal Astro: Framework Masa Depan untuk Website Berbasis Konten',
                    konten: '<p>Content here...</p>',
                    kategori: 'produk',
                    waktu_baca: 5,
                    image: '778a9e6d-a3d0-475d-8873-a91966cdcf38',
                    author: {
                      first_name: 'Kesya Sakha Nesya',
                      last_name: 'Arimawan',
                      title: 'Backend Developer',
                      avatar: 'a8b9c1d2-3e4f-5g6h-7i8j-9k0l1m2n3o4p',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        id: 'assets',
        name: 'Assets',
        description: 'Endpoints untuk mengelola file dan gambar',
        endpoints: [
          {
            id: 'get-asset',
            method: 'GET',
            path: '/assets/:id',
            description: 'Mengambil file gambar/asset berdasarkan UUID. Gunakan UUID dari field "image" atau "author.avatar".',
            queryParams: [
              {
                name: 'quality',
                type: 'integer (0-100)',
                required: false,
                description: 'Kompresi kualitas gambar. Default: 80',
              },
              {
                name: 'width',
                type: 'integer',
                required: false,
                description: 'Resize lebar gambar dalam pixel',
              },
              {
                name: 'height',
                type: 'integer',
                required: false,
                description: 'Resize tinggi gambar dalam pixel',
              },
              {
                name: 'fit',
                type: 'string',
                required: false,
                description: 'Mode resize: "cover", "contain", "inside", "outside". Default: "cover"',
              },
              {
                name: 'format',
                type: 'string',
                required: false,
                description: 'Format output: "jpg", "png", "webp", "avif". Default: original format',
              },
            ],
            response: {
              status: 200,
              contentType: 'image/*',
              schema: 'Binary File (Image/Document)',
              example: 'Returns the actual file content with appropriate Content-Type header.',
            },
          },
        ],
      },
    ],
    errorHandling: {
      commonErrors: [
        {
          status: 401,
          message: 'Unauthorized',
          description: 'Token tidak valid atau tidak ada. Pastikan header Authorization berisi Bearer token yang valid.',
        },
        {
          status: 404,
          message: 'Not Found',
          description: 'Resource yang diminta tidak ditemukan.',
        },
        {
          status: 500,
          message: 'Internal Server Error',
          description: 'Terjadi kesalahan pada server. Hubungi administrator.',
        },
      ],
    },
    changelog: [
      {
        date: '2026-01-19',
        version: '1.0.0',
        changes: [
          'Initial release',
          'Added Blogpost endpoints',
          'Added Assets endpoints',
        ],
      },
    ],
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getAllProjects(): Project[] {
  return projects
}
