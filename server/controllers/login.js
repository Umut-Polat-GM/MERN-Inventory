const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.status(200).json({ msg: "request successful", token });
};

module.exports = login;
