const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieparser = require("cookie-parser");

const { globalErrorHandler } = require("./middlewares");

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://104.142.122.231",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

const app = express();
app.use(cookieparser());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const {
  authRouter,
  vacanciesRouter,
  productsRouter,
  feedbackRouter,
  servicesRouter,
  resumeRouter,
} = require("./routes/api");

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/vacancies", vacanciesRouter);
app.use("/api/products", productsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/resume", resumeRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(globalErrorHandler);

module.exports = app;
