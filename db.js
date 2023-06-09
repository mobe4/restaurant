require('dotenv').config();
const { MongoClient } = require('mongodb');

// const uri = 'mongodb://localhost:27017';

async function connect() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.error(err);
    }
}






module.exports = { client, connect };
