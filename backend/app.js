//MongoDb Connection: mongodb+srv://assadullah:<password>@cluster0.javh6jf.mongodb.net/?retryWrites=true&w=majority
//MongoDb Password: OpenClassrooms
//Import express
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");
const cors = require("cors");
const app = express();

//Connecting to Database
mongoose
   .connect(
      "mongodb+srv://assadullah:OpenClassrooms@cluster0.javh6jf.mongodb.net/?retryWrites=true&w=majority"
   )
   .then(() => {
      console.log("Successfully Connected Database");
   })
   .catch((error) => {
      console.log("Unable to Connect to Database");
      console.error(error);
   });

app.use(bodyParser.json());

//Setting the Headers CORS
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
   );
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
   );
   next();
});
app.use("*", cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);

app.use("/api/auth", userRoutes);

//Export app
module.exports = app;
