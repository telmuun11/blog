const User = require("./model/User");
const Post = require("./model/Post");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const MONGODB_URL = process.env.MONGODB_URL
const connection = mongoose.connection;


require("dotenv").config();
var cors = require('cors')

app.use(cors())
app.use(express.json());


mongoose.connect(MONGODB_URL);


connection.once("open", () => {
  console.log("Successfully connected to MongoDB server");
});






const middleware = () => {
  const token = req.headers.authorization;
  console.log(token);

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      console.log(err);
      res.send("Login invalid");
      return;
    }
    console.log(decoded);
    res.locals.userId = decoded.data._id;
    next();
  });
}



app.get("/", middleware, async (req, res) => {
  const users = await User.find().lean();
  res.send({
    data: users,
  });
});


app.get("/posts", middleware, async (req, res) => {
  const posts = await Post.find().populate("author");
  res.send({
    data: posts,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: password,
  }).lean();
  if (user) {
    token = jwt.sign(
      {
        data: user,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    res.send({
      token: token,
    });
  }
  res.send({
    message: "Invalid credential",
  });
});
app.post("/posts", async (req, res) => {
  const { title, body, coverImage, userId } = req.body;

  try {
    const post = await Post.create({
      title,
      body,
      coverImage,
      author: userId,
    });
    res.send({
      message: "Post added",
    });
  } catch (e) {
    res.send({
      error: e,
    });
  }
});

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.send({
      message: "User added",
    });
  } catch (e) {
    res.send({
      message: e,
    });
  }
});

app.put("/users", async (req, res) => {
  const { username, email, password, id } = req.body;
  const user = await User.findOne({ _id: id }).exec();
  let message;
  if (!user) {
    message = "User not found";
  } else {
    user.username = username;
    user.password = password;
    user.save();
    //user.delete()
    message = "Updated user info";
  }

  res.send({
    message,
  });
});
//app.delete('/users', );

app.listen(3000, () => {
  console.log("web server is running on port 3000");
});



//    web ----> server 
