const express = require("express");
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://eyagargah:mypassword@cluster0.s98m2ta.mongodb.net/test";

app.get("/", (req, res) => {
  res.json("hello to my app");
});

app.post("/signup", (req, res) => {
  const client = new MongoClient(uri);
});

//get users
app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("app-data");
    const users = db.collection("users");
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

app.listen(8000, () => console.log(`Server Started at ${8000}`));
