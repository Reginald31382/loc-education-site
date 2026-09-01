import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

type RouteContext = {
  params: Promise<{
    articleSlug: string;
  }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { articleSlug } = await params;

    const { searchParams } = new URL(request.url);

    const contentType = searchParams.get("contentType") || "lesson";

    if (!["lesson", "product"].includes(contentType)) {
      return NextResponse.json(
        {
          error: "Invalid content type.",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const comments = await Comment.find({
      articleSlug,
      contentType,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      comments,
    });
  } catch (error) {
    console.error("COMMENTS_GET_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to load comments.",
      },
      {
        status: 500,
      },
    );
  }
}
