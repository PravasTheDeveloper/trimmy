import { redirect } from 'next/navigation'
import { connectToDatabase } from '@/lib/db'
import Link from '@/models/Link'

interface PageProps {
  params: {
    code: string
  }
}

export default async function RedirectPage(props: PageProps) {
  // Make sure params is treated as a Promise
  const resolvedParams = await Promise.resolve(props.params)
  const code = resolvedParams.code
  
  await connectToDatabase()
  const link = await Link.findOne({ shortCode: code })

  if (!link) {
    // You can throw an error here or return a custom 404 page
    return <h1>404 - Link Not Found</h1>
  }

  // Redirect to the original URL
  redirect(link.longUrl)
}