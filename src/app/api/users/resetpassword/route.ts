import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        error: "User Not Found invalid verify token",
        status: 400,
        data: "INVALID TOKEN",
      });
    }

    // //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    user.password = hashedpassword;

    await user.save();

    return NextResponse.json({
      success: "Password Updated",
      status: 200,
      data: "success",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
      data: "INVALID TOKEN password verification error",
      statues: 500,
    });
  }
}
