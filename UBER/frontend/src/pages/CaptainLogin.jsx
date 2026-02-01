import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Captain login:', { email, password })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#001e00' }}>
      <header className="p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-8 h-8 brightness-0 invert"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
          <span className="font-bold text-lg text-white">Uber Driver</span>
        </Link>
        <Link to="/" className="text-gray-400 hover:text-white text-sm transition">Back</Link>
      </header>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-white mb-2">Sign in to drive</h1>
        <p className="text-gray-400 mb-8">Earn on your schedule. Login to accept ride requests.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          New driver?{' '}
          <Link to="/captain-signup" className="text-emerald-400 font-semibold hover:text-emerald-300 underline transition">
            Sign up to drive
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainLogin
