const {validationResult} = require("express-validator");
const changepasswordService = require("../../services/auth/changepasswordService");

async function changepasswordController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            errors: errors.array() 
        });
    }

    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;
        // console.log(userId);
        await changepasswordService({userId, oldPassword, newPassword});
        res.json({
            status: true, 
            message: "Password change successfully"
        });
    } catch (err) {
        res.status(400).json({
           status :false,
           message: err.message
        });
    }
};

module.exports = changepasswordController;