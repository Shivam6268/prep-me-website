
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate,  } from 'react-router-dom';

function Landing() {

   const {user, isLoading, isError, message} = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  }, [user, navigate])

  if(isLoading){
    return <p className="text-gray-400 text-2xl h-screen flex justify-center items-center">Loading...</p>
  }

   if(isError){
    return <p className="text-red-400 text-2xl h-screen flex justify-center items-center">{message}</p>
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fadeIn">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Prepare Smarter. Get Hired Faster
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-4 font-medium">
            Level up your interview game with AI-powered questions
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Get personalized interview questions tailored to your skills and experience. Practice smarter, not harder.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/form"
              className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-purple-500/50 transform transition-all duration-300"
            >
              Get Started
            </Link>
           
          </div>
        </div>

      </div>
    </div>
  );
}

export default Landing;
