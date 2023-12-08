import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// including next: NextRequest makes it so next doesn't cache this.
export async function GET(request: NextRequest) {
  // Gets all users form DB.
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { email: body.email }
  });
  if (user)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })

  // Its convention to have status code set to 201 if successful object creation
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email
    }
  })
  return NextResponse.json(newUser, { status: 201 });
}

