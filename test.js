const {MongoClient} = require("mongodb");

require("dotenv").config({path: "./config.env"});


const uri = process.env.MONGODB_PREFIX + process.env.MONGODB_USERNAME + ":" +
process.env.MONGODB_PASSWORD + process.env.MONGODB_URL;

const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

connectToMongoDB();
