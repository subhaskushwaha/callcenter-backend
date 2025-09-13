const {validationResult} = require("express-validator");
const changePasswordService = require("../../services/auth/changepasswordService");

async function changepasswordController(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).
        json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;
        console.log(userId);
        await changePasswordService({ userId, oldPassword, newPassword});
        res.json({
            success:true,
            message: "Password change successfully"
        });
    }catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = changepasswordController;