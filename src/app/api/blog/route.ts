import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/lib/models/BlogPost";

export const dynamic = "force-dynamic";

function parsePositiveInteger(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim();
    const category = searchParams.get("category")?.trim();

    await connectDB();

    if (slug) {
      const post = await BlogPost.findOne({ slug, isPublished: true }).lean();
      if (!post) {
        return NextResponse.json(
          { error: "Blog post not found." },
          { status: 404 },
        );
      }

      return NextResponse.json({ post }, { status: 200 });
    }

    const page = parsePositiveInteger(searchParams.get("page"), 1);
    const limit = Math.min(
      parsePositiveInteger(searchParams.get("limit"), 10),
      50,
    );
    const query = {
      isPublished: true,
      ...(category && category !== "All" ? { category } : {}),
    };
    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    return NextResponse.json({ posts, page, limit, total }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
