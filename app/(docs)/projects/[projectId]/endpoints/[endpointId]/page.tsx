import { getProject } from '@/lib/projects'
import { notFound } from 'next/navigation'
import EndpointDetail from '@/components/EndpointDetail'

interface PageProps {
  params: {
    projectId: string
    endpointId: string
  }
}

export default function EndpointPage({ params }: PageProps) {
  const project = getProject(params.projectId)

  if (!project) {
    notFound()
  }

  let endpoint = null
  for (const group of project.apiGroups) {
    endpoint = group.endpoints.find((e) => e.id === params.endpointId)
    if (endpoint) break
  }

  if (!endpoint) {
    notFound()
  }

  return (
    <EndpointDetail
      project={project}
      endpoint={endpoint}
    />
  )
}
