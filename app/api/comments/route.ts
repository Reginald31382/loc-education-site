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
    const contentType = body.contentType || "lesson";

    if (!articleSlug || !content) {
      return NextResponse.json(
        {
          error: "Content and comment text are required.",
        },
        {
          status: 400,
        },
      );
    }

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
      contentType,
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
