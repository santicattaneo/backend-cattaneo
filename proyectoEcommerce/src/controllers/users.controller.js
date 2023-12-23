const register = async (req, res) => {
    res.send({ status: 'success', message: 'user registered' });
};

const failRegister = async (req, res) => {
    res.send({ status: 'success', message: 'register fail' });
};

const login = async (req, res) => {
    try {
        if(!req.user){
            return res.status(400).send({ status: 'error', message: 'Invalid credentials'})
        };
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age
        };
        res.send({ status: 'success', message: 'Login successful'});
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const failLogin = async (req, res) => {
    res.send({ status: 'success', message: 'login fail' });
};

const github = async (req, res) => {
    res.send({ status: 'success', message: 'user registered with github' });
};

const githubCb = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
};

const logout = async (req, res) => {
    req.session.destroy(error => {
        if(error) return res.sendServerError(error.message);
        res.redirect('/');
    });
};

const current = async (req, res) => {
    const currentUser = req.session.user;
    res.send({ status: 'success', current: currentUser });
};

export {
    register,
    failRegister,
    login,
    failLogin,
    github,
    githubCb,
    logout,
    current
};