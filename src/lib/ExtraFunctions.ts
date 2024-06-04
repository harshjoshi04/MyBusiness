import { Order } from "./type";

const characters = "0123456789";
export function generateString(length: number): number {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return Number(result.trim());
}

export function getProfitByDay(
  orders: Order[]
): { date: string; profit: number }[] {
  const profitMap = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toISOString().split("T")[0];
    const profit = order.FullAmount;

    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += profit;

    return acc;
  }, {} as { [date: string]: number });

  // Convert the profit map to an array of objects
  return Object.keys(profitMap).map((date) => ({
    date,
    profit: profitMap[date],
  }));
}
