import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  company?: string;
  budgetRange?:
    | "Under $2,000"
    | "$2,000 to $5,000"
    | "$5,000 to $10,000"
    | "$10,000 to $25,000"
    | "$25,000+"
    | "Not Sure Yet";
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
      "Under $2,000",
      "$2,000 to $5,000",
      "$5,000 to $10,000",
      "$10,000 to $25,000",
      "$25,000+",
      "Not Sure Yet",
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
