import prisma from "@/lib/prismaCliient";
import { User } from "@/lib/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        {
          status: "error",
          message: "Id Must be Required !",
        },
        { status: 404 }
      );
    const UserData = await prisma.user.findUnique({ where: { id: id } });
    return NextResponse.json({
      status: "success",
      data: UserData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error ",
        message: "Innternal Server Error !",
      },
      { status: 505 }
    );
  }
}

export async function POST(req: Request): Promise<Response | any> {
  try {
    const { username, password } = await req.json();
    if (!username || !password)
      return NextResponse.json(
        {
          status: "error",
          message: "username or password went wrong !",
        },
        { status: 404 }
      );
    const findUser = await prisma.user.findFirst({
      where: { username, password },
    });
    if (!findUser)
      return NextResponse.json(
        {
          status: "error",
          message: "username or password went wrong !",
        },
        { status: 404 }
      );
    return NextResponse.json({ status: "success", data: findUser });
  } catch (er) {
    return (
      NextResponse.json({
        status: "error",
        message: "username or password went wrong !",
      }),
      { status: 404 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { name, username, password }: User = await req.json();
    if (!name || !username || !password)
      return NextResponse.json(
        {
          status: "error",
          message: "All Field Must Be Required !",
        },
        {
          status: 404,
        }
      );
    await prisma.user.create({ data: { name, username, password } });
    return NextResponse.json({
      status: "success",
      message: "User Add Successfully !",
    });
  } catch (er) {
    console.log(er);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error !",
      },
      { status: 505 }
    );
  }
}
