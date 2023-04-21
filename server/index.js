const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json())

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://eyagargah:mypassword@cluster0.s98m2ta.mongodb.net/test";

app.get("/", (req, res) => {
  res.json("hello to my app");
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  console.log(req.body)
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashed_password = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const db = client.db("app-data");
    const users = db.collection("users");

    const existingUser = users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists.please sign in");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,

      hashed_password: hashed_password,
    };

   const insertedUser =  await users.insertOne(data)

   const token = jwt.sign(insertedUser, sanitizedEmail, {
    //expires in 24 hrs
    expiresIn: 60 * 24,
   })

   res.status(201).json( { token , userId: generatedUserId ,email: sanitizedEmail})
  } catch(err){
    console.log(err)
  }
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
