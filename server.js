/** @format */

const mongoose = require("mongoose");
const app = require("./app");
const { MONGO_CONNECTION_STRING, PORT = 3001 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then((result) => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
