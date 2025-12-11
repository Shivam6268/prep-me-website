import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import InformationForm from './pages/InformationForm';
import Questions from './pages/Questions';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element = {<Register/>} />
            <Route path="/form" element={<InformationForm />} />
            <Route path="/questions" element={<Questions />} />
          </Routes>
          <ToastContainer />
        </main>
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
