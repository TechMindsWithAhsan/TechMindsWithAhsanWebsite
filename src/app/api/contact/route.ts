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
  website?: unknown;
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

// In-memory sliding window rate limiting (max 5 requests per 10 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many contact requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as ContactRequest;

    // Honeypot check: reject bot submissions filling the hidden website field
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json(
        { message: "Message received successfully." },
        { status: 201 },
      );
    }

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
