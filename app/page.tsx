'use client'

import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const shorten = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ longUrl: url }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    setShortUrl(data.shortUrl)
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Trimmy</h1>
      <input
        type="text"
        placeholder="Enter a long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded mb-2"
      />
      <button
        onClick={shorten}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Shorten
      </button>

      {shortUrl && (
        <div className="mt-4">
          <p className="text-lg font-medium">Your Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </main>
  )
}
