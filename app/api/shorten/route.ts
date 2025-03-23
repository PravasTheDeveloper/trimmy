import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { connectToDatabase } from '@/lib/db'
import Link from '@/models/Link'

export async function POST(req: NextRequest) {
  const { longUrl } = await req.json()

  await connectToDatabase()

  const shortCode = nanoid(6)
  const link = await Link.create({ shortCode, longUrl })

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
  })
}
