const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

async function changepasswordService({userId, oldPassword, newPassword}) {
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) throw new Error("old password is incorrect");

    const hash = await bcrypt.hash(newPassword, 10);
    await userModel.setPassword(user.id, hash);
    return true;
};

module.exports = changepasswordService;