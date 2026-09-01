import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SiteVisit from "@/models/SiteVisit";

export async function GET() {
  try {
    await connectDB();

    const visit = await SiteVisit.findOne({
      key: "site-visits",
    }).lean();

    return NextResponse.json({
      count: visit?.count ?? 0,
    });
  } catch (error) {
    console.error("VISIT_COUNT_GET_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to load visit count.",
      },
      {
        status: 500,
      },
    );
  }
}
