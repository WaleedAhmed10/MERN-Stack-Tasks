function FeedbackList({ feedbacks }) {
  return (
    <div className="feedback-list">
      <h2>Feedback List</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Rating</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.studentName}</td>
                <td>{feedback.subject}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.comments || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FeedbackList;