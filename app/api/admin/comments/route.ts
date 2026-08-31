import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const comments = await Comment.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("ADMIN_COMMENTS_GET_ERROR", error);

    return NextResponse.json(
      { error: "Failed to fetch comments." },
      { status: 500 },
    );
  }
}
