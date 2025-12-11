
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';

function Navbar() {

  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const logoutButton = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      logoutButton();
    }
  }, []);


  return (
    <nav className=" bg-gradient-to-r from-blue-300 to-purple-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transform transition-transform duration-300">
            Prep-Me
          </Link>
          {
            !user ? (<div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg">
                Register
              </Link>
            </div>) : (<button onClick={() => logoutButton()} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg">
              Logout
            </button>)
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
