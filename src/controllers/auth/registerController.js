const {validationResult} = require("express-validator");
const registerService = require("../../services/auth/registerService");

async function registerController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).
        json({
           success: false,
           errors: errors.array() 
        });
    }

    try {
        const { name, email, password } = req.body;
        const {user, token} = await registerService({name, email, password });
        res.status(201).
        json({
            success: true,
            data: {user, token}
        });
    } catch (err) {
        res.status(400).
        json({
            success: false, 
            message: err.message
        });
    }
}

module.exports =  registerController ;
