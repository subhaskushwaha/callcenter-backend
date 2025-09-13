const db = require("../config/db.config");

async function create({name, email, password, role = "user"}) {
  const [res] = await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  return {id: res.insertId, name, email, role};
}

async function findByEmail(email) {
   const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
   return rows[0] || null;
}

async function findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
}

async function setPassword(userId, hashedPassword) {
    await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]); 
}

async function setResetToken(userId, token, expiresAt) {
  await db.query(
    "UPDATE users SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?",
    [token, expiresAt, userId]
  );
}

async function clearResetToken(userId) {
  await db.query(
    "UPDATE users SET resetToken = NULL, resetTokenExpiration = NULL WHERE id = ?"
    [userId]
  );
}

async function findByResetToken(token) {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiration > NOW()",
    [token]
  );
  return rows[0] || null;
}

module.exports = {create, findByEmail, findById, setPassword, setResetToken, clearResetToken, findByResetToken}