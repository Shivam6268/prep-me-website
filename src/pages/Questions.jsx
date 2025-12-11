import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearQuestions } from '../feature/auth/questionSlice';


function Questions() {

  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, message, questions } = useSelector(state => state.question)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (isLoading) {
    return <p className="text-gray-400 text-2xl h-screen flex justify-center items-center">Loading...</p>
  }

  if (isError) {
    return <p className="text-red-400 text-2xl h-screen flex justify-center items-center">{message}</p>
  }


  const addNewInformation = () => {
    dispatch(clearQuestions());
    navigate("/form");
  };

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');


  const categories = ['All', 'Python', 'JavaScript', 'React', 'Node.js', 'Frontend',
    'Backend', 'DevOps', 'Java', 'C++', 'AWS', 'Docker',
    'Kubernetes', 'SQL', 'MongoDB', 'TypeScript'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const categoryMatch = selectedCategory === 'All' || q.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const isFilterActive = selectedCategory !== 'All' || selectedDifficulty !== 'All';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Your AI-Generated Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Personalized interview questions based on your profile
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedDifficulty === diff
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {isFilterActive && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="mt-6 px-4 py-2 text-gray-600 underline hover:text-gray-800 transition-colors duration-300 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex justify-between items-center mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-700 font-semibold">
            Showing <span className="text-purple-600">{filteredQuestions.length}</span> of <span className="text-purple-600">{questions.length}</span> questions
          </p>
        </div>

        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredQuestions.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-105 transform transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-wrap items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      #{item.id}
                    </span>
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <span className={`px-4 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>
                <p className="text-gray-800 text-lg font-medium">Q. {item.question}</p>
                <p className="text-gray-500 text-sm font-medium"><span className='text-gray-800 text-lg'>Ans:-</span>  {item.answers}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center animate-fadeIn">
            <p className="text-2xl font-bold text-gray-700 mb-2">No questions found</p>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        )}

        <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <button onClick={() => addNewInformation()} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-110 hover:shadow-purple-500/50 transform transition-all duration-300">
            Add New Information
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
