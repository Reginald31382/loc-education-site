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

    await connectDB();

    const comments = await Comment.find({
      articleSlug,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      comments,
    });
  } catch (error) {
    console.error("APPROVED_COMMENTS_GET_ERROR", error);

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
