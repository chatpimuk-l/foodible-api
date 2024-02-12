require("dotenv").config();
const express = require("express");

const authRoute = require("./routes/auth-route");
const error = require("./middlewares/error");
const notFound = require("./middlewares/not-found");

const app = express();

app.use(express.json());

app.use("/auth", authRoute);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log("serving running on", PORT);
});
