function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'You do not have the required role to access this resource.' });
    }
  };
}

module.exports = authorize;