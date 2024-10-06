import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://nayunk10:bnyky7645*@yoon.ccaom.mongodb.net/?retryWrites=true&w=majority&appName=yoon'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }