import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { questionGenerate } from '../feature/auth/questionSlice';

function InformationForm() {

  // ✅ ALL HOOKS MUST BE AT TOP LEVEL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { isLoading, isError, message, questions, isSuccess } =
    useSelector(state => state.question);

  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    experience: '',
    technologies: [],
    additionalDetails: ''
  });

  const techOptions = [
    'Python', 'JavaScript', 'React', 'Node.js', 'Frontend',
    'Backend', 'DevOps', 'Java', 'C++', 'AWS', 'Docker',
    'Kubernetes', 'SQL', 'MongoDB', 'TypeScript'
  ];

  // ✅ AUTH GUARD
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ NAVIGATE ONLY AFTER SUCCESSFUL GENERATION
  useEffect(() => {
    if (isSuccess && Array.isArray(questions) && questions.length > 0) {
      navigate("/questions");
    }
  }, [isSuccess, questions, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(questionGenerate(formData));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.includes(tech)
        ? formData.technologies.filter(t => t !== tech)
        : [...formData.technologies, tech]
    });
  };

  // ✅ SAFE CONDITIONAL RETURNS (AFTER ALL HOOKS)
  if (isLoading) {
    return (
      <p className="text-gray-400 text-2xl h-screen flex justify-center items-center">
        Loading...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-400 text-2xl h-screen flex justify-center items-center">
        {message}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Tell Us About You
          </h2>
          <p className="text-gray-600 text-lg">
            Help us generate the perfect interview questions for you
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-purple-500/20 transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='Enter Full Name'
                className="w-full px-4 py-3 border-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Qualification *
              </label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 rounded-lg"
              >
                <option value="">Select</option>
                <option value="high-school">High School</option>
                <option value="bachelors">Bachelor's</option>
                <option value="masters">Master's</option>
                <option value="phd">PhD</option>
                <option value="bootcamp">Bootcamp</option>
                <option value="self-taught">Self-Taught</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 rounded-lg"
              >
                <option value="">Select</option>
                <option value="0-1">0–1</option>
                <option value="1-3">1–3</option>
                <option value="3-5">3–5</option>
                <option value="5-8">5–8</option>
                <option value="8+">8+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Technologies *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {techOptions.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTechnology(tech)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      formData.technologies.includes(tech)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows="4"
              placeholder='Enter AdditionalDetails'
              className="w-full px-4 py-3 border-2 rounded-lg"
            />

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-lg"
            >
              Generate Questions
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default InformationForm;
