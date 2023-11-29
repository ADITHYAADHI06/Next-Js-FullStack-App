import { connect } from "../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const Token = await request.text();
    console.log(Token);
    const user = await User.findOne({
      verifyToken: Token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({
        error: "User Not Found invalid verify token",
        status: 400,
        data: "INVALID TOKEN",
      });
    }
    user.isVerfied = true;
    // user.verifyToken = undefined;
    // user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      success: "email verification sucess",
      status: 200,
      data: "success",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
      data: "INVALID TOKEN",
      statues: 500,
    });
  }
}
