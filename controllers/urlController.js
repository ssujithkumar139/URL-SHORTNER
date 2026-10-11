
const Url = require('../models/url');
const crypto = require('crypto');

const createUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate the original URL
    if (!originalUrl || !originalUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Original URL is required'
      });
    }

    // Validate URL format
    let parsedUrl;

    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid URL'
      });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        success: false,
        message: 'Only HTTP and HTTPS URLs are allowed'
      });
    }

    // Generate a short code
    const shortCode = crypto.randomBytes(4).toString('hex');

    // Save URL in MongoDB
    const newUrl = await Url.create({
      originalUrl: parsedUrl.href,
      shortCode
    });

    // Send the response
    return res.status(201).json({
      success: true,
      message: 'URL created successfully',
      data: newUrl
    });

  } catch (error) {
    console.error('Failed to create URL:', error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Short code already exists. Please try again.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = { createUrl };