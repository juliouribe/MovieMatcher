import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id }
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }) {
  // validate the request body
  const body = await request.json();
  // if invalid return 400
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })
  // fetch user with given id
  // if user doesn't exist return 404

  const user = await prisma.user.findUnique({
    where: { id: params.id }
  })

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // update user
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email
    }
  })
  // return updated user
  return NextResponse.json(updatedUser)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id }
  })

  // Fetch the user, return 404 if not found
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  // Delete the user, return 200 response
  await prisma.user.delete({
    where: { id: user.id }
  });

  return NextResponse.json({});
}
