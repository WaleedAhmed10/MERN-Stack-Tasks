import { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const filteredFeedbacks = selectedSubject ? feedbacks.filter(f => f.subject === selectedSubject) : feedbacks;

  const averageRating = filteredFeedbacks.length > 0 ? (filteredFeedbacks.reduce((sum, f) => sum + f.rating, 0) / filteredFeedbacks.length).toFixed(1) : 0;

  return (
    <div className="App">
      <h1>Student Feedback Management System</h1>
      <FeedbackForm onSubmit={fetchFeedbacks} />
      <div>
        <label>Filter by Subject: </label>
        <select value={selectedSubject} onChange={(e) => handleSubjectChange(e.target.value)}>
          <option value="">All</option>
          {[...new Set(feedbacks.map(f => f.subject))].map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        {selectedSubject && <p>Average Rating for {selectedSubject}: {averageRating}</p>}
      </div>
      <FeedbackList feedbacks={filteredFeedbacks} />
    </div>
  );
}

export default App;