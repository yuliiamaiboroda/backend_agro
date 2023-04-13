const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { authRouter, vacanciesRouter, productsRouter } = require("./routes/api");
const { globalErrorHandler } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/vacancies", vacanciesRouter);
app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(globalErrorHandler);

module.exports = app;
