import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  // Define 5 questions
  const questions = [
    "How would you rate your overall experience with the volunteering activity?",
    "How challenging did you find the tasks assigned to you?",
    "How well did you feel you collaborated with other volunteers?",
    "How much did you learn from this volunteering experience?",
    "How enjoyable was the volunteering activity?"
  ];

  // Initialize state for responses, comments, and file upload
  const [responses, setResponses] = useState(Array(5).fill(null));
  const [comments, setComments] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Handle emoji click event
  const handleEmojiClick = (questionIndex, rating) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = rating;
    setResponses(updatedResponses);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User feedback: ", responses);
    console.log("Comments: ", comments);
    console.log("Uploaded file: ", uploadedFile ? uploadedFile.name : 'No file uploaded');
    alert("Thank you for your feedback!");
  };

  // Handle comments input
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  // Handle image upload
  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  return (
    <div className="feedback-form">
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <p>{question}</p>
            <div className="emoji-options">
              {['😡', '😟', '😐', '😊', '😍'].map((emoji, i) => (
                <span
                  key={i}
                  className={`emoji ${responses[index] === i + 1 ? 'selected' : ''}`}
                  onClick={() => handleEmojiClick(index, i + 1)}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Comments Section */}
        <div className="comments-section">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={handleCommentsChange}
            placeholder="Enter your comments here..."
          />
          
          {/* Image Upload */}
          <div className="image-upload">
            <label htmlFor="file-upload">Upload Image:</label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
