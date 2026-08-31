import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const status = body.status;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid comment status.",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      },
    );

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

    return NextResponse.json({
      message: "Comment updated successfully.",
      comment,
    });
  } catch (error) {
    console.error("ADMIN_COMMENT_PATCH_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to update comment.",
      },
      {
        status: 500,
      },
    );
  }
}
