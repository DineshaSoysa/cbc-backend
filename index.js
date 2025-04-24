import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  const tokenString = req.header("Authorization");
  if (tokenString != null) {
    const token = tokenString.replace("Bearer ", "");
    // console.log(token);

    jwt.verify(token, "dinesha123", (err, decode) => {
      if (decode != null) {
        req.user = decode;
        next();
      } else {
        res.json({
          message: "Invalid token",
        });
      }
    });
  }else{
    next()
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:123@cluster0.saowz5f.mongodb.net/myStore?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database connected");
  });

app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(5000);
