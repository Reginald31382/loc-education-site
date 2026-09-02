import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
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
        { error: "Invalid content type." },
        { status: 400 },
      );
    }

    const session = await auth();
    const currentUserId = session?.user?.id;

    await connectDB();

    const comments = await Comment.find({
      articleSlug,
      contentType,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    const formattedComments = comments.map((comment) => {
      const likedBy = comment.likedBy || [];

      return {
        _id: comment._id.toString(),
        articleSlug: comment.articleSlug,
        contentType: comment.contentType,
        userName: comment.userName,
        userImage: comment.userImage,
        content: comment.content,
        createdAt: comment.createdAt,
        adminReply: comment.adminReply || "",
        adminReplyAt: comment.adminReplyAt || null,

        // Public like information.
        likes: likedBy.length,
        liked: currentUserId ? likedBy.includes(currentUserId) : false,
      };
    });

    return NextResponse.json({
      comments: formattedComments,
    });
  } catch (error) {
    console.error("COMMENTS_GET_ERROR", error);

    return NextResponse.json(
      { error: "Failed to load comments." },
      { status: 500 },
    );
  }
}
