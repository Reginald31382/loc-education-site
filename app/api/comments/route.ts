import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();

    const articleSlug =
      typeof body.articleSlug === "string" ? body.articleSlug.trim() : "";

    const content = typeof body.content === "string" ? body.content.trim() : "";

    const userName =
      typeof body.userName === "string" ? body.userName.trim() : "";

    const contentType = body.contentType || "lesson";

    if (!articleSlug || !content || !userName) {
      return NextResponse.json(
        {
          error: "Name and comment text are required.",
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

    if (userName.length > 100) {
      return NextResponse.json(
        {
          error: "Names cannot exceed 100 characters.",
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

      // Anonymous comments receive an empty userId.
      // Signed-in users still have their account ID saved.
      userId: session?.user?.id || "",

      // Anonymous users provide their own display name.
      // Signed-in users can also submit a custom display name.
      userName,

      userImage: session?.user?.image || "",
      content,

      // Every comment must be approved before appearing publicly.
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
