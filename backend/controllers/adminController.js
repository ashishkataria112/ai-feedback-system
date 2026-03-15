const Feedback = require('../models/Feedback');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Feedback.getAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};