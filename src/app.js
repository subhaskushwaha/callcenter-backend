const express = require("express");
const app = express();
const routes = require("./routes/index");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", routes);   

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

