const { validationResult } = require("express-validator");
const loginService = require("../../services/auth/loginService");

async function loginController(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).
        json({
            success: false, 
            errors: errors.array()
        })
    }

    try {
        const {email, password} = req.body;
        const data = await  loginService({email, password});
        res.json({
            success: true, data
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

module.exports =  loginController ;