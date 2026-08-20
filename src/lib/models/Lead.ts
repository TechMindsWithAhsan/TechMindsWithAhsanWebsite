import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  email: string;
  source: 'homepage' | 'blog' | 'popup' | 'footer';
  status: 'new' | 'contacted' | 'converted';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  source: {
    type: String,
    enum: ['homepage', 'blog', 'popup', 'footer'],
    default: 'homepage',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
