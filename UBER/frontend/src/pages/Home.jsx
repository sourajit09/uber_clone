import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">
      <div
        className="flex-1 flex flex-col justify-between bg-cover bg-center min-h-[70vh]"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop)`,
        }}
      >
        <header className="p-6">
          <img
            className="w-12 h-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
        </header>
        <div className="p-6 pb-8" />
      </div>

      <div className="bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-8 -mt-6 relative z-10">
        <h1 className="text-2xl font-bold text-black mb-2">Get there</h1>
        <p className="text-gray-600 mb-8">Request a ride or sign up to drive. Your day, your way.</p>

        <div className="space-y-3">
          <Link
            to="/user-login"
            className="flex items-center justify-center w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            I need a ride
          </Link>
          <Link
            to="/captain-login"
            className="flex items-center justify-center w-full bg-gray-100 text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
          >
            I want to drive
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          New to Uber?{' '}
          <Link to="/user-signup" className="text-black font-medium underline">
            Sign up as rider
          </Link>
          {' · '}
          <Link to="/captain-signup" className="text-black font-medium underline">
            Sign up as driver
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Home
