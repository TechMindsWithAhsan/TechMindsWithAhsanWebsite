import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  company?: string;
  budgetRange?:
    | "Under $500"
    | "$500 to $1,500"
    | "$1,500 to $3,000"
    | "$3,000 to $7,000"
    | "$7,000+"
    | "Flexible / Let's Discuss";
  projectType?:
    | "AI Automation"
    | "Custom & Web Development"
    | "Mobile App Development"
    | "SaaS Product"
    | "Growth Marketing"
    | "SEO"
    | "Consulting"
    | "Other";
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  company: {
    type: String,
    trim: true,
  },
  budgetRange: {
    type: String,
    enum: [
      "Under $500",
      "$500 to $1,500",
      "$1,500 to $3,000",
      "$3,000 to $7,000",
      "$7,000+",
      "Flexible / Let's Discuss",
    ],
  },
  projectType: {
    type: String,
    enum: [
      "AI Automation",
      "Custom & Web Development",
      "Mobile App Development",
      "SaaS Product",
      "Growth Marketing",
      "SEO",
      "Consulting",
      "Other",
    ],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
