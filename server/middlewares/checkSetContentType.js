const checkSetContentType = async (req, res, next) => {
  res.type('application/json');

  if (req.method !== 'GET' && !req.is('application/json')) {
    res.status(400).json('Content-Type should be application/json');
  } else {
    next();
  }
};

module.exports = checkSetContentType;
