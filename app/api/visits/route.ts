import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SiteVisit from "@/models/SiteVisit";

export async function GET() {
  try {
    await connectDB();

    const visit = await SiteVisit.findOneAndUpdate(
      {
        key: "site-visits",
      },
      {
        $inc: {
          count: 1,
        },
      },
      {
        new: true,
        upsert: true,
      },
    ).lean();

    return NextResponse.json({
      count: visit.count,
    });
  } catch (error) {
    console.error("VISIT_COUNTER_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to record visit.",
      },
      {
        status: 500,
      },
    );
  }
}
