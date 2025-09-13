const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

function signToken(user) {
    return jwt.sign(
        {id: user.id, email: user.email, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES || "1h"}
    );
}

async function loginService({email, password}){
    const user = await userModel.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    const token = signToken(user);
    return {user: {id: user.id, name: user.name, email: user.email}, token };
};

module.exports =  loginService;