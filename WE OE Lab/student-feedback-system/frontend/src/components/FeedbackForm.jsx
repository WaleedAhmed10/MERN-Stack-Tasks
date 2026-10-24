import { useState } from 'react';

function FeedbackForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    studentName: '',
    subject: '',
    rating: 1,
    comments: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage('Feedback submitted successfully!');
        setFormData({ studentName: '', subject: '', rating: 1, comments: '' });
        onSubmit();
      } else {
        setMessage('Error submitting feedback.');
      }
    } catch (error) {
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <div className="feedback-form">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:</label>
          <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label>Rating:</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <label>Comments:</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default FeedbackForm;