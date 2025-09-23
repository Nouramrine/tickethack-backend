const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://nouramrine_db_user:6okKvTPvKZqitJRP@cluster0.dxljdri.mongodb.net/tickethack";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
