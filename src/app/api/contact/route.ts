import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";

interface ContactRequest {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  budgetRange?: unknown;
  projectType?: unknown;
  message?: unknown;
}

const projectTypes = new Set([
  "AI Automation",
  "Custom & Web Development",
  "Mobile App Development",
  "SaaS Product",
  "Growth Marketing",
  "SEO",
  "Consulting",
  "Other",
]);
const budgetRanges = new Set([
  "Under $2,000",
  "$2,000 to $5,000",
  "$5,000 to $10,000",
  "$10,000 to $25,000",
  "$25,000+",
  "Not Sure Yet",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const company =
      typeof body.company === "string" ? body.company.trim() : undefined;
    const budgetRange =
      typeof body.budgetRange === "string" && budgetRanges.has(body.budgetRange)
        ? body.budgetRange
        : undefined;
    const projectType =
      typeof body.projectType === "string" && projectTypes.has(body.projectType)
        ? body.projectType
        : undefined;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 },
      );
    }

    if (
      name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 20
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid name, email, and message of at least 20 characters.",
        },
        { status: 400 },
      );
    }

    await connectDB();
    await Contact.create({
      name,
      email,
      company,
      budgetRange,
      projectType,
      message,
    });

    return NextResponse.json(
      { message: "Message received successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
