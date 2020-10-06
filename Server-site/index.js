const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.li2le.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const Data = client.db("Volunteer-network").collection("Data");
  
    app.post('/addData', (req, res) => {
        const data = req.body;
        Data.insertOne(data)
        console.log(data)
        // .then(res => {
        //     console.log(res);
        // })
    })

});


app.listen(port)