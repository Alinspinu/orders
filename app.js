if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

const helmet = require("helmet");
const cors = require('cors')



const apiRoutes = require("./routes/true-orders");
const bodyParser = require('body-parser');
const helmetConfig = require('./config/helmet');
const sessionConfig = require('./config/session');
const recipeRoutes = require('./routes/recipe')

const fs = require('fs');
const https = require('https');

app.use(cors())
app.set('trust proxy', true);

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
app.use(session(sessionConfig));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


app.use(helmet.contentSecurityPolicy(helmetConfig))
app.use(flash());
app.use(bodyParser.json());
app.disable("etag");


app.use((req, res, next) => {
  res.locals.flowerpower = 1;
  res.locals.autUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.session = req.session;
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/recipes", recipeRoutes)
app.use("/api", apiRoutes)




app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "O Noo! Something went wrong!";
  res.status(statusCode).render("error", { err });
});


const keyPath = path.resolve(__dirname, 'ssl/key.pem');
const certPath = path.resolve(__dirname, 'ssl/cert.pem');

const certOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

const server = https.createServer(certOptions, app);

const port = process.env.PORT || 8010;
server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
