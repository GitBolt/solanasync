import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  creationDate: { type: Date, default: Date.now },
  name: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  twitter: { type: String },
  instagram: { type: String },
});


const User = mongoose.models.User || mongoose.model('User', UserSchema)

const AttendeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: String,
  goals: String,
  workshop: { type: Schema.Types.ObjectId, ref: 'Workshop' }
});

const Attendee = mongoose.models.Attendee || mongoose.model('Attendee', AttendeeSchema);

const WorkshopSchema = new Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  capacity: Number,
  start: Date,
  end: Date,
  quizMetadata: Schema.Types.Mixed,
  cNFTMetadata: Schema.Types.Mixed,
  owner: { type: String, ref: 'User', required: true },
  links: Schema.Types.Mixed,
  attendees: [{ type: Schema.Types.ObjectId, ref: 'Attendee' }]
});


const Workshop = mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema)

export { User, Workshop, Attendee, WorkshopSchema, UserSchema }
