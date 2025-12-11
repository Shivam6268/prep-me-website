import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Link, useNavigate } from "react-router-dom"
import { registerUser } from "../feature/auth/authSlice"


function Register() {

  const { user, isLoading, isError, message } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  if (isLoading) {
    return <p className="text-gray-400 text-2xl h-screen flex justify-center items-center">Loading...</p>
  }

  if (isError) {
    return <p className="text-red-400 text-2xl h-screen flex justify-center items-center">{message}</p>
  }

  const [formData, setFromData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const dispatch = useDispatch()
  const { name, email, password, confirmPassword } = formData

  const handleChange = e => {
    setFromData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return <p className="text-red">Both Password are samPlease </p>
    }
    
    dispatch(registerUser(formData))
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Join Us
          </h2>
          <p className="text-gray-600">Start your interview prep journey today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-purple-500/20 transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
                placeholder="Akash"
              />
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-purple-500/50 transform transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
