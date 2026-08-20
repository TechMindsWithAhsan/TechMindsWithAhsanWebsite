import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Lead } from "@/lib/models/Lead";

interface LeadRequest {
  email?: unknown;
  source?: unknown;
}

const sources = new Set(["homepage", "blog", "popup", "footer"]);

// Note: In a real production app, you would import a MongoDB client instance here.
// For example: import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequest;
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source =
      typeof body.source === "string" && sources.has(body.source)
        ? body.source
        : "homepage";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    await connectDB();
    const existingLead = await Lead.exists({ email });
    if (existingLead) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 },
      );
    }

    await Lead.create({ email, source });
    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter!" },
      { status: 201 },
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 },
      );
    }
    console.error("Error in leads route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
