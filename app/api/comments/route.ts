import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be signed in to comment.",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const articleSlug = body.articleSlug?.trim();
    const content = body.content?.trim();

    if (!articleSlug || !content) {
      return NextResponse.json(
        {
          error: "Article and comment content are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (content.length > 2000) {
      return NextResponse.json(
        {
          error: "Comments cannot exceed 2000 characters.",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const comment = await Comment.create({
      articleSlug,
      userId: session.user.id,
      userName: session.user.name || "LOCED reader",
      userImage: session.user.image || "",
      content,
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "Comment submitted for review.",
        comment,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("COMMENT_POST_ERROR", error);

    return NextResponse.json(
      {
        error: "Something went wrong while submitting your comment.",
      },
      {
        status: 500,
      },
    );
  }
}
