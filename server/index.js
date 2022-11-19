import app from './server.js';
import dotenv from 'dotenv'
import mongodb from 'mongodb';
import ReviewsDAO from './dao/reviewsDAO.js';
dotenv.config()

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.USER_NAME;
const mongo_password = process.env.USER_PASSWORD;

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.koysbiv.mongodb.net/?retryWrites=true&w=majority`;

const port = 8000

MongoClient.connect(
    uri,
    {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true
    })
    .catch(error => {
      console.error(error.stack);
      process.exit(1);
    })
    .then(async client => {
      await ReviewsDAO.injectDB(client)
      app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      })
    })