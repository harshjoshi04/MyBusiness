import prisma from "@/lib/prismaCliient";
import { NextRequest, NextResponse as res } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, type } = await req.json();
    if (!id)
      return res.json({ status: "error", message: "Id Must Be Required !" });
    type
      ? await prisma.product.update({
          where: { id },
          data: { stock: { increment: 1 } },
        })
      : await prisma.product.update({
          where: { id },
          data: { stock: { increment: -1 } },
        });

    return res.json({ status: "success", message: "Stock Update !" });
  } catch (error) {
    return res.json(
      { status: "error", message: "Internal Server Error !" },
      { status: 404 }
    );
  }
}
