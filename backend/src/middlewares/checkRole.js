export const checkRole = (role) => {
  return (req, res, next) => {
    console.log("Required:", role);
    console.log("Current user:", req.user);

    if (req.user && req.user.role === role) {
      return next();
    }

    if (!req.user) {
      return res.status(403).json({ 
        error: 'Access denied: No authenticated user found.' 
      });
    }

    return res.status(403).json({ 
      error: `Access denied: Required role '${role}', but got '${req.user.role}'` 
    });
  };
};
