import prisma from "@/lib/prismaCliient";
import { Category } from "@/lib/type";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const search = req.nextUrl.searchParams.get("s");
    if (!id)
      return NextResponse.json(
        {
          status: "error",
          message: "Id Must Be Required !",
        },
        { status: 404 }
      );
    let findUser = await prisma.category.findMany({ where: { userId: id } });
    if (search)
      findUser = findUser?.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      );
    return NextResponse.json({ status: "success", data: findUser.reverse() });
  } catch (er) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error !",
      },
      { status: 505 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { id, name }: Category = await req.json();
    if (!id || !name) {
      return NextResponse.json(
        {
          status: "error",
          message: "Internal Server Error !",
        },
        { status: 404 }
      );
    }
    const InsertData = await prisma.category.create({
      data: { name: name as string, userId: id as string },
    });
    return NextResponse.json({
      status: "Success",
      messgae: "Category Add Successfully !",
      data: InsertData,
    });
  } catch (er) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error !",
      },
      { status: 505 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { status: "error", message: "Id Not Found !" },
        { status: 404 }
      );
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({
      status: "success",
      message: "Delete Successfully !",
    });
  } catch (er) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error !",
      },
      { status: 505 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name } = await req.json();
    if (!id || !name)
      return NextResponse.json(
        {
          status: "error",
          message: "All Field Must Be Required !",
        },
        { status: 404 }
      );
    await prisma.category.update({ where: { id }, data: { name } });
    return NextResponse.json({
      status: "success",
      message: "Data Update Successfully !",
    });
  } catch (er) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error !",
      },
      { status: 505 }
    );
  }
}
