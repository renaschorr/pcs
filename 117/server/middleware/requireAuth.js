const requireAuth = (req, res, next) => {
    // Check if user is authenticated
    if (!req.body) {
      console.log("req.user ")
      console.log(req.body)
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  };
  
  module.exports = requireAuth;
  