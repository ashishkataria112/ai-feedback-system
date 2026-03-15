const Feedback = require('../models/Feedback');
const Sentiment = require('sentiment');

const sentiment = new Sentiment();

exports.submitFeedback = async (req, res) => {
  try {
    const { feedback_text } = req.body;
    if (!feedback_text) return res.status(400).json({ message: 'Feedback text required' });

    const result = sentiment.analyze(feedback_text);
    let sentimentType;
    if (result.score > 0) sentimentType = 'positive';
    else if (result.score < 0) sentimentType = 'negative';
    else sentimentType = 'neutral';

    const feedbackId = await Feedback.create({
      user_id: req.user.id,
      feedback_text,
      sentiment: sentimentType
    });

    res.status(201).json({ message: 'Feedback submitted', sentiment: sentimentType });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findAll();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};