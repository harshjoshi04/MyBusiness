"use client";
import Card from "@/components/Card";
import Chart from "@/components/Chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/context/useUser";
import API from "@/lib/apiRoute";
import { DashboardType } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const arr = [1, 2, 3, 4];

export default function Home() {
  const { isLoad, userData } = useUser();

  const { data: Dashboard, isLoading } = useQuery<DashboardType>({
    queryKey: ["dash", userData?.id],
    queryFn: async () => {
      const { data } = await axios.get(`${API.DASH}?id=${userData?.id}`);
      return data.data;
    },
  });

  return (
    <div className=" mt-7 flex flex-col gap-8">
      {isLoad && !isLoading ? (
        <p className="text-3xl font-bold">Welcome {userData?.name}</p>
      ) : (
        <>
          <Skeleton className="w-48 h-10 " />
        </>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
        <div>
          <p className="text-xl font-bold my-3 ">Overview</p>
          <div className="grid w-fit gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center items-center ">
            {isLoad && !isLoading ? (
              <>
                <Card title="Total Category" num={Dashboard?.findCategory} />
                <Card title="Total Product" num={Dashboard?.findProduct} />
                <Card title="Total Order" num={Dashboard?.findOrder} />
                <Card title="Total Profit" num={Dashboard?.total} />
              </>
            ) : (
              arr.map((item, index) => (
                <Skeleton className="w-52 h-28 rounded-2xl" key={index} />
              ))
            )}
          </div>
        </div>
        <div className="w-9/12">
          {isLoad && !isLoading ? (
            <div className="border rounded-md px-4 pt-4 h-80 overflow-auto">
              <p className="text-xl font-bold my-3 mx-4">Recent Orders</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>BillNo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Dashboard?.LastOrder?.length ? (
                    Dashboard?.LastOrder?.map((item) => (
                      <TableRow key={item?.id}>
                        <TableCell>{item?.billNumber}</TableCell>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.productName}</TableCell>
                        <TableCell>{item?.category}</TableCell>
                        <TableCell className="text-right">
                          {item?.FullAmount}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-lg font-medium ">
                        <div className="flex justify-center items-center">
                          Order Not Found !
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Skeleton className="w-full h-full rounded-md" />
          )}
        </div>
      </div>
      <div className="w-10/12 overflow-hidden">
        {isLoad && !isLoading && Dashboard?.chartData?.length ? (
          <Chart data={Dashboard?.chartData} />
        ) : (
          <Skeleton className="w-full h-full rounded-md" />
        )}
      </div>
    </div>
  );
}
