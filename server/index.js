const PORT = 8000
const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://eyagargah:mypassword@cluster0.s98m2ta.mongodb.net/test'
app.get('/', (req, res) =>  {
    res.json('hello to my app')
})


app.post('/signup', (req, res) =>  {
    const  client = new MongoClient(uri)
})

//get users
app.get('/users', async(req , res)=> {
    const  client = new MongoClient(uri)

    try {
        await client.connect()
        const db = client.db('app-data')
        const users = db.collection('users')
        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    }
    finally {
        await client.close()
    }
})
app.listen(PORT , ()=> console.log('Server running on PORT ' + PORT))