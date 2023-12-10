import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  publicKey: { type: String, required: true, unique: true },
  creationDate: { type: Date, default: Date.now },
});


const User = mongoose.model('User', UserSchema)


const WorkshopSchema = new Schema({
  name: { type: String, required: true },
  location: String,
  date: Date,
  quizMetadata: Schema.Types.Mixed,
  cNFTMetadata: Schema.Types.Mixed,
  importantLinks: [String],
  owner: { type: String, ref: 'User', required: true },
});


const Workshop = mongoose.model('Workshop', WorkshopSchema)

export { User, Workshop }
