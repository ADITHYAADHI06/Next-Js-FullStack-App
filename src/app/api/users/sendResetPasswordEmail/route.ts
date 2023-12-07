import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/sendEmail";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // console.log(reqBody);
    const { _id, emailType, email } = reqBody;

    const res = await sendEmail({
      email: email,
      emailType: emailType,
      userId: _id,
    });
    // console.log(res);
    return NextResponse.json({ data: reqBody });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
