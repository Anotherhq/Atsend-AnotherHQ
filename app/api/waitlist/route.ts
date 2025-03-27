import { NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { sendEmail } from "@/service/resend/sendEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const existingUser = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email already in waitlist" }, { status: 409 });
    }

    const result = await prisma.waitlist.create({
      data: { email },
      select:{
        email:true
      }
    });

    const firstName = result.email.split("@")[0];

    const emailResult = await sendEmail(result.email, firstName);

    if (!emailResult) {
      return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Added to waitlist!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
