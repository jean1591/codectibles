import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get data from Github
  // Get data from DB

  // How many PR merged on Github ?
  // Has milestone been reached ?

  return NextResponse.json({
    prMilestone: 8,
    prMerged: 2,
  });
}
