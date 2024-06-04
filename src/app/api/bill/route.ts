import { generateString } from "@/lib/ExtraFunctions";
import prisma from "@/lib/prismaCliient";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const search = req.nextUrl.searchParams.get("s");
    if (!id)
      return res.json(
        { status: "error", message: "Id Must Be Required !" },
        { status: 404 }
      );

    let findOrder = await prisma.order.findMany({
      where: { userId: id },
    });
    if (search)
      findOrder = findOrder.filter(
        (el) =>
          el.billNumber
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          el.name.toLowerCase().includes(search.toLowerCase()) ||
          el.address.toLowerCase().includes(search.toLowerCase()) ||
          el.productName.toLowerCase().includes(search.toLowerCase()) ||
          el.category.toLowerCase().includes(search.toLowerCase())
      );
    return res.json({ status: "success", data: findOrder });
  } catch (er) {
    return res.json(
      { status: "error", message: "Internal Server Error " },
      { status: 404 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      name,
      address,
      phone,
      productName,
      category,
      stock,
      productId,
      price,
    } = await req.json();

    if (
      !userId ||
      !name ||
      !address ||
      !phone ||
      !productId ||
      !productName ||
      !category ||
      !stock ||
      !price
    )
      return res.json(
        { status: "error", message: "All Field Must Be Required !" },
        { status: 404 }
      );

    await prisma.order.create({
      data: {
        userId,
        name,
        address,
        phone,
        billNumber: generateString(6),
        productName,
        category,
        quantity: stock,
        FullAmount: stock * price,
        price,
      },
    });
    await prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: stock } },
    });

    return res.json({ status: "success", message: "Bill Add Successfully !" });
  } catch (er) {
    console.log(er);
    return res.json(
      { status: "error", message: "Internal Server Error !" },
      { status: 404 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return res.json(
        { status: "error ", message: "Id Must Be Required !" },
        { status: 404 }
      );
    await prisma.order.delete({ where: { id } });
    return res.json({
      status: "success",
      message: "Order Delete Successfully !",
    });
  } catch (er) {
    return res.json(
      { status: "error", message: "Internal Server Error !" },
      { status: 404 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, address, phone } = await req.json();
    if (!id || !name || !address || !phone)
      return res.json(
        {
          status: "error",
          message: "All Field Must Be Required !",
        },
        { status: 404 }
      );
    await prisma.order.update({
      where: { id },
      data: { name, address, phone },
    });
    return res.json({
      status: "success",
      message: "Order Update Successfully !",
    });
  } catch (er) {
    return res.json(
      { status: "error", message: "Internal Server Error !" },
      { status: 404 }
    );
  }
}
