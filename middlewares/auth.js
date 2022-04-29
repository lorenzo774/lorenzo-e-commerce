// Handle auth error
const authError = (res, msg) => {
  res.status(403);
  return res.send(msg);
};

// Authorize only user who sign in
const authUser = function (req, res, next) {
  if (!req.user) {
    res.status(403);
    return res.send("You need to sign in");
  }
  next();
};

// Authorize only admin user
const authAdmin = function (req, res, next) {
  if (!req.user) {
    return authError(res, "You first need to sign in");
  }

  // check admin
  const { admin } = req.user;
  if (!admin) {
    return authError(res, "You don't have authorization");
  }
  next();
};

const isAdmin = function (user) {
  if (user.admin) {
    return true;
  }
  return false;
};

const viewRole = function (userPage, adminPage, data) {
  // Middleware returned
  return async function (req, res, next) {
    // View page
    const { admin } = req.user;
    const _data = await data(req, res, next);

    if (!req.user) {
      res.render(userPage, _data);
    } else {
      res.render(admin ? adminPage : userPage, _data);
    }
  };
};

module.exports = {
  authError,
  authUser,
  isAdmin,
  authAdmin,
  viewRole,
};
