import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

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

    await prisma.waitlist.create({
      data: { email },
    });

    return NextResponse.json({ message: "Added to waitlist!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
