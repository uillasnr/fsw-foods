import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return NextResponse.json("Invalid data.", { status: 400 });
    }

    const isUserExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isUserExists) {
      return NextResponse.json({ error: "Existing email." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
