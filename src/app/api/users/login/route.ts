import { connect } from "../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //verifying User already Exists

    // console.log(User);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user not esits" }, { status: 400 });
    }

    let verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(
      tokenData,
      process.env.NEXT_PUBLIC_SECRET_TOKEN!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
