// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
        return next();
    }

    // If the user isn't logged in, redirect them status code 403
    return res.redirect("/auth/failure");
};
