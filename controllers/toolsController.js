// controllers/toolsController.js — handles password and URL checking logic
const Scan = require('../models/Scan');

// PASSWORD CHECKER
const checkPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Please provide a password' });
    }

    let score = 0;
    let suggestions = [];
    let flags = [];

    // Check length
    if (password.length >= 8) score += 20;
    else suggestions.push('Use at least 8 characters');

    if (password.length >= 12) score += 10;
    else suggestions.push('Use 12+ characters for stronger password');

    // Check uppercase
    if (/[A-Z]/.test(password)) score += 20;
    else suggestions.push('Add uppercase letters (A-Z)');

    // Check lowercase
    if (/[a-z]/.test(password)) score += 20;
    else suggestions.push('Add lowercase letters (a-z)');

    // Check numbers
    if (/[0-9]/.test(password)) score += 15;
    else suggestions.push('Add numbers (0-9)');

    // Check symbols
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    else suggestions.push('Add symbols (!@#$%^&*)');

    // Check common passwords
    const commonPasswords = [
      'password', 'password123', '123456', '12345678',
      'qwerty', 'abc123', 'monkey', 'master', 'letmein',
      'dragon', '111111', 'baseball', 'iloveyou', 'trustno1'
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
      score = 0;
      flags.push('This is a very common password — change it immediately!');
    }

    // Determine label
    let label;
    if (score >= 80) label = 'Strong';
    else if (score >= 50) label = 'Medium';
    else label = 'Weak';

    // Save scan to database
    await Scan.create({
      userId: req.user._id,
      type: 'password',
      input: '********',
      result: label,
      score: score
    });

    res.status(200).json({
      label,
      score,
      suggestions,
      flags
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// URL CHECKER
const checkUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Please provide a URL' });
    }

    let score = 0;
    let flags = [];

    // Check for HTTPS
    if (!url.startsWith('https')) {
      score += 20;
      flags.push('No HTTPS — connection is not secure');
    }

    // Check for IP address as hostname
    if (/^https?:\/\/\d+\.\d+\.\d+\.\d+/.test(url)) {
      score += 30;
      flags.push('IP address used instead of domain name');
    }

    // Check for suspicious keywords
    const suspiciousWords = [
      'login', 'verify', 'free', 'account', 'update',
      'secure', 'banking', 'confirm', 'winner', 'prize'
    ];
    suspiciousWords.forEach(word => {
      if (url.toLowerCase().includes(word)) {
        score += 10;
        flags.push(`Suspicious keyword found: "${word}"`);
      }
    });

    // Check for lookalike domains
    const lookalikes = [
      'amaz0n', 'paypa1', 'g00gle', 'faceb00k',
      'micros0ft', 'app1e', 'netfl1x'
    ];
    lookalikes.forEach(word => {
      if (url.toLowerCase().includes(word)) {
        score += 40;
        flags.push(`Lookalike domain detected: "${word}"`);
      }
    });

    // Check for excessive subdomains
    const domainParts = url.replace(/https?:\/\//, '').split('/')[0].split('.');
    if (domainParts.length > 4) {
      score += 20;
      flags.push('Excessive subdomains detected');
    }

    // Determine verdict
    let verdict;
    if (score === 0) verdict = 'Safe';
    else if (score <= 30) verdict = 'Suspicious';
    else verdict = 'Dangerous';

    // Save scan to database
    await Scan.create({
      userId: req.user._id,
      type: 'url',
      input: url,
      result: verdict,
      score: score
    });

    res.status(200).json({
      verdict,
      score,
      flags
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET HISTORY
const getHistory = async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      count: scans.length,
      scans
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { checkPassword, checkUrl, getHistory };