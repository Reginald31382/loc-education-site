import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

type RouteContext = {
  params: Promise<{
    articleSlug: string;
    commentId: string;
  }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        {
          error: "You must be signed in to like a comment.",
        },
        {
          status: 401,
        },
      );
    }

    const { articleSlug, commentId } = await params;

    await connectDB();

    const comment = await Comment.findOne({
      _id: commentId,
      articleSlug,
      status: "approved",
    });

    if (!comment) {
      return NextResponse.json(
        {
          error: "Comment not found.",
        },
        {
          status: 404,
        },
      );
    }

    const alreadyLiked = comment.likedBy?.includes(userId);

    if (!alreadyLiked) {
      comment.likedBy = [...(comment.likedBy || []), userId];

      await comment.save();
    }

    const likes = comment.likedBy?.length || 0;

    return NextResponse.json({
      message: alreadyLiked
        ? "You already liked this comment."
        : "Comment liked.",
      likes,
      liked: true,
    });
  } catch (error) {
    console.error("COMMENT_LIKE_POST_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to like comment.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        {
          error: "You must be signed in to unlike a comment.",
        },
        {
          status: 401,
        },
      );
    }

    const { articleSlug, commentId } = await params;

    await connectDB();

    const comment = await Comment.findOne({
      _id: commentId,
      articleSlug,
      status: "approved",
    });

    if (!comment) {
      return NextResponse.json(
        {
          error: "Comment not found.",
        },
        {
          status: 404,
        },
      );
    }

    comment.likedBy = (comment.likedBy || []).filter(
      (id: string) => id !== userId,
    );
    await comment.save();

    const likes = comment.likedBy?.length || 0;

    return NextResponse.json({
      message: "Comment unliked.",
      likes,
      liked: false,
    });
  } catch (error) {
    console.error("COMMENT_LIKE_DELETE_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to unlike comment.",
      },
      {
        status: 500,
      },
    );
  }
}
