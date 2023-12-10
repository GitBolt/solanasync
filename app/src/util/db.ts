// mongoose.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}


async function dbConnect() {
  const opts = {
    bufferCommands: false,
  }
  const connection = await mongoose.connect(MONGO_URI as string, opts).then((mongoose) => {
    return mongoose;
  })

  return connection
}

export default dbConnect;
