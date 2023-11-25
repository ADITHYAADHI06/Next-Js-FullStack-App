import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getUserDetails(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const decodedToken: any = jwt.verify(
    token,
    process.env.NEXT_PUBLIC_SECRET_TOKEN!
  );

  //   console.log(decodedToken);
  return decodedToken.id;
}
