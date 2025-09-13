const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel")

function signToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );
}

async function registerService({ name, email, password }) {
    const existing = await userModel.findByEmail(email);
    if (existing) throw new Error("Email already registed");

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hash});
    const token = signToken(user);

    return {user, token};
};

module.exports = registerService;