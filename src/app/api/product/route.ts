import prisma from "@/lib/prismaCliient";

import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const searchQuery = req.nextUrl.searchParams.get("s");
    if (!id)
      return res.json(
        { status: "error", message: "Id Must Be Required !" },
        { status: 404 }
      );
    let findData = await prisma.product.findMany({
      where: { userId: String(id) },
      include: { category: true },
    });
    if (searchQuery)
      findData = findData.filter(
        (el: any) =>
          el?.productName
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          el?.category.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    return res.json({
      status: "success",
      data: findData.reverse(),
    });
  } catch (er) {
    return res.json(
      { status: "erorr", message: "Internal Server Error" },
      { status: 505 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { productName, categoryId, basePrice, price, stock, userId } =
      await req.json();
    if (
      !productName ||
      !categoryId ||
      !basePrice ||
      !price ||
      !stock ||
      !userId
    )
      return res.json(
        {
          status: "error",
          message: "All Field Must Be Required !",
        },
        {
          status: 404,
        }
      );
    await prisma.product.create({
      data: {
        productName,
        categoryId,
        basePrice: Number(basePrice),
        price: Number(price),
        stock: Number(stock),
        userId,
      },
    });
    return res.json({
      status: "success",
      message: "Product Add Successfully !",
    });
  } catch (er) {
    console.log(er);
    return res.json(
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
    const { id, productName, categoryId, basePrice, price, stock } =
      await req.json();
    if (!id || !productName || !categoryId || !basePrice || !price || !stock)
      return res.json(
        {
          status: "error",
          message: "All Field Must Be Required !",
        },
        { status: 404 }
      );
    await prisma.product.update({
      where: { id },
      data: {
        productName,
        categoryId,
        basePrice: Number(basePrice),
        price: Number(price),
        stock: Number(stock),
      },
    });
    return res.json({
      status: "success",
      message: "Product Update Successfully !",
    });
  } catch (er) {
    console.log(er);
    return res.json({ status: "error", message: er }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return res.json(
        { status: "error", messsage: "Id Must Be Required !" },
        { status: 404 }
      );
    await prisma.product.delete({ where: { id } });
    return res.json({
      status: "success",
      message: "Product Delete Successfully !",
    });
  } catch (er) {
    return res.json(
      { status: "error", message: "Internal Server Error !" },
      { status: 505 }
    );
  }
}
