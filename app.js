require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var cors = require("cors");
const passport = require("passport");
const model = require("./models/index");
const GooglePassport = require("./passport/google.passport");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var upLoadFileRouter = require("./routes/uploadfile");
var authRouter = require("./routes/auth");

var app = express();

app.use(
  session({
    secret: "f8",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passport.use("google", GooglePassport);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await model.User.findByPk(id);
  done(null, user);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Cấu hình để phục vụ tệp tin từ thư mục 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/uploadFile", upLoadFileRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "Không tồn tại!" });
});

module.exports = app;
