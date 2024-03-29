require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const limiter = require("./middlewares/rate-limit");

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const recipeRoute = require("./routes/recipe-route");
const responseRoute = require("./routes/response-route");
const favRoute = require("./routes/fav-route");

const error = require("./middlewares/error");
const notFound = require("./middlewares/not-found");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(limiter);
app.use(morgan("dev"));
app.use("/public", express.static("public"));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/recipes", recipeRoute);
app.use("/responses", responseRoute);
app.use("/favs", favRoute);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log("serving running on", PORT);
});
