import { redirect } from 'next/navigation'

interface PageProps {
  params: {
    projectId: string
  }
}

export default function ProjectPage({ params }: PageProps) {
  redirect(`/projects/${params.projectId}/overview`)
}
