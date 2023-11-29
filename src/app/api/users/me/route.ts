import { connect } from "../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "@/helpers/getUserDetails";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserDetails(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
