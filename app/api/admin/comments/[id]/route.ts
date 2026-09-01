import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function isAdmin(email?: string | null) {
  return (
    !!email && email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()
  );
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!isAdmin(session?.user?.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!isAdmin(session?.user?.email)) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 403,
        },
      );
    }

    const { id } = await params;

    await connectDB();

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
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
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error("ADMIN_COMMENT_DELETE_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to delete comment.",
      },
      {
        status: 500,
      },
    );
  }
}
