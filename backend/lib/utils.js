// lib/utils.js
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '15d'
    });
  
    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true, // Prevent XSS attacks
      sameSite: 'strict', // CSRF protection
      secure: process.env.NODE_ENV !== 'development'
    });
  };
  
  export const handleErrors = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
  };