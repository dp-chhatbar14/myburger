var UserModel = require('../schemas/userSchema');

exports.getUser = async (req, res) => {
    try {
        const result = await UserModel.find(req.body);
        if (!result.length) {
            res.status(201).json({ message: 'User does not exists' });
        }
        else {
            res.status(200).json({ name: result[0].username });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.newUser = async (req, res) => {
    try {
        const newUser = { username: req.body.username, email: req.body.email, password: req.body.password };
        const result = await UserModel.create(newUser);
        if (!result.length) {
            res.status(201).json({
                message: "User is already Registered"
            });
        }
        else {
            res.status(200).json({
                message: "User Created Successfully"
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.ingredients = async (req, res) => {
    try {
        res.status(201).json({ "bacon": 0, "cheese": 0, "meat": 0, "salad": 0 });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.errmsg,
        });
    }
};

