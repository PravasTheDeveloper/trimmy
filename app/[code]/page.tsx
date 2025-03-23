import { redirect } from 'next/navigation'
import { connectToDatabase } from '@/lib/db'
import Link from '@/models/Link'

export default async function RedirectPage({ params }: { params: { code: string } }) {
  await connectToDatabase()
  const link = await Link.findOne({ shortCode: params.code })

  if (!link) return <h1>404 - Link Not Found</h1>
  redirect(link.longUrl)
}
