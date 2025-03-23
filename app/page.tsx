'use client'

import { useState } from 'react'
import { Copy, ExternalLink, Link, Check } from 'lucide-react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const shorten = async () => {
    if (!url) return
    
    setIsLoading(true)
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({ longUrl: url }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      setShortUrl(data.shortUrl)
    } catch (error) {
      console.error('Error shortening URL:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col">
      {/* Hero */}
      <header className="text-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Link className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Trimmy
            </h1>
          </div>
          
          <p className="text-xl mb-10 text-gray-700 max-w-xl mx-auto">
            Shorten long links instantly and share them anywhere ✂️
          </p>

          <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto transform transition hover:shadow-xl">
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3">
              <input
                type="text"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border border-gray-200 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={shorten}
                disabled={isLoading || !url}
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition transform hover:scale-105 ${
                  isLoading || !url 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </span>
                ) : (
                  'Shorten URL'
                )}
              </button>
            </div>

            {shortUrl && (
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2 font-medium">Your short link:</p>
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium truncate flex items-center">
                    {shortUrl}
                    <ExternalLink className="w-4 h-4 ml-2 inline-block" />
                  </a>
                  <button 
                    onClick={copyToClipboard}
                    className="ml-2 p-2 text-gray-500 hover:text-blue-600 transition"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 relative">
          <span className="inline-block relative">
            Why use Trimmy?
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-center mb-3 text-blue-600">Lightning Fast</h3>
            <p className="text-gray-600 text-center">Generate short links instantly using our optimized backend infrastructure.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-center mb-3 text-purple-600">Effortlessly Simple</h3>
            <p className="text-gray-600 text-center">No account, no hassle. Just paste your URL and get a shortened link in seconds.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-center mb-3 text-indigo-600">Completely Secure</h3>
            <p className="text-gray-600 text-center">All links are stored securely with enterprise-grade encryption and privacy protection.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 relative">
            <span className="inline-block relative">
              How Trimmy Works
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-blue-200 z-0"></div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative z-10">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">1</div>
              <h3 className="text-lg font-semibold text-center mb-3">Paste Your URL</h3>
              <p className="text-gray-600 text-center">Enter your long URL into the input field at the top of the page</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative z-10">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">2</div>
              <h3 className="text-lg font-semibold text-center mb-3">Generate Short Link</h3>
              <p className="text-gray-600 text-center">Click the "Shorten URL" button to create your unique shortened link</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative z-10">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">3</div>
              <h3 className="text-lg font-semibold text-center mb-3">Share Anywhere</h3>
              <p className="text-gray-600 text-center">Copy your new short URL and share it on social media, emails, or messages</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 relative inline-block">
          About Trimmy
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
        </h2>
        <p className="text-lg text-gray-700">
          Trimmy is a lightweight, open-source URL shortener built with Next.js and MongoDB. 
          Whether you're sharing links on social media, in emails, or anywhere else online, 
          Trimmy makes your URLs cleaner, shorter, and easier to share.
        </p>
        
        <div className="mt-10">
          <a 
            href="https://github.com/yourusername/trimmy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link className="w-6 h-6 text-white mr-2" />
              <span className="font-bold text-xl">Trimmy</span>
            </div>
            
            <div className="text-sm text-blue-200">
              &copy; {new Date().getFullYear()} Trimmy. Built with 💙 by you.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}