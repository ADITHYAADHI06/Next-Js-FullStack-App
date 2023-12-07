import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // console.log(email);
    // console.log(emailType);
    // console.log(userId);
    // console.log(hashedToken);

    if (emailType === "VERIFY") {
      console.log("verify called");
      // console.log(User);

      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      console.log("reset called");

      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "9f7fa5763b9447",
    //     pass: process.env.NEXT_PUBLIC_PASSWORD,
    //   },
    // });

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9f7fa5763b9447",
        pass: process.env.NEXT_PUBLIC_PASSWORD,
      },
    });

    // const mailOptions = {
    //   from: "adithyashetty102@gmail.com",
    //   to: email,
    //   subject:
    //     emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    //   html: `<p>Click <a href="${
    //     process.env.NEXT_PUBLIC_DOMAIN
    //   }/verifyemail?token=${hashedToken}">here</a> to ${
    //     emailType === "VERIFY" ? "verify your email" : "reset your password"
    //   }
    //     or copy and paste the link below in your browser. <br> ${
    //       process.env.NEXT_PUBLIC_DOMAIN
    //     }/verifyemail?token=${hashedToken}
    //     </p>`,
    // };

    const mailOptions = {
      from: "adithyashetty102@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType == "VERIFY"
          ? `<p>Click <a href="${
              process.env.NEXT_PUBLIC_DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            }
        or copy and paste the link below in your browser. <br> ${
          process.env.NEXT_PUBLIC_DOMAIN
        }/verifyemail?token=${hashedToken}
        </p> `
          : `<p>Click <a href="${
              process.env.NEXT_PUBLIC_DOMAIN
            }/resetpassword?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            }
          or copy and paste the link below in your browser. <br> ${
            process.env.NEXT_PUBLIC_DOMAIN
          }/resetpassword?token=${hashedToken}
          </p> `,
    };

    // send mail with options
    const mailresponse = await transport.sendMail(mailOptions);
    console.log("respone from mailtrap  \n\n \n " + mailresponse);

    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
