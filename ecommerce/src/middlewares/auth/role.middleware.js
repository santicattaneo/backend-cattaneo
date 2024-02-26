export const roleAuth = (...roles) => (req, res, next) => {
    const rolesLength = roles.length;
    for(i=0; i < rolesLength; i++) {
        if (req.user.role === roles[i]) {
            return next();
        };
    };
    return res.status(400).send({ status: 'error', message: 'access forbidden' });
};