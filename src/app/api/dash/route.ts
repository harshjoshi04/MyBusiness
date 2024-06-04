import { getProfitByDay } from "@/lib/ExtraFunctions";
import prisma from "@/lib/prismaCliient";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return res.json(
        { status: "error", message: "Id must be required !" },
        { status: 404 }
      );

    const findProduct = await prisma.product.count();
    const findCategory = await prisma.category.count();
    const findOrder = await prisma.order.count();
    const totalProfite = await prisma.order.aggregate({
      _sum: {
        FullAmount: true,
      },
    });
    const LastOrder = await prisma.order.findMany({
      where: { userId: id },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    const allOrder = await prisma.order.findMany({ where: { userId: id } });
    return res.json({
      status: "success",
      data: {
        findCategory,
        findProduct,
        findOrder,
        total: totalProfite?._sum?.FullAmount,
        LastOrder,
        chartData: getProfitByDay(allOrder),
      },
    });
  } catch (er) {
    return res.json(
      { status: "error", message: "Internal Server Error !" },
      { status: 505 }
    );
  }
}
