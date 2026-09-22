const express = require("express");
const bodyParser = require("body-parser");
const profileRoutes = require("./routes/profiles");

const app = express();
app.use(bodyParser.json());
app.use("/profiles", profileRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
