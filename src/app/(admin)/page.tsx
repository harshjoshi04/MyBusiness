"use client";
import Card from "@/components/Card";
import Chart from "@/components/Chart";
import OrderTable from "@/components/OrderTable";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/context/useUser";
import React from "react";

const arr = [1, 2, 3, 4];

export default function Home() {
  const { isLoad, userData } = useUser();
  return (
    <div className=" mt-7 flex flex-col gap-8">
      {isLoad ? (
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
            {arr.map((item, index) =>
              isLoad ? (
                <Card key={index} />
              ) : (
                <Skeleton className="w-52 h-28 rounded-2xl" key={index} />
              )
            )}
          </div>
        </div>
        <div className="w-9/12">
          {isLoad ? (
            <div className="border rounded-md px-4 pt-4 h-80 overflow-auto">
              <p className="text-xl font-bold my-3 mx-4">Recent Orders</p>
              <OrderTable />
            </div>
          ) : (
            <Skeleton className="w-full h-full rounded-md" />
          )}
        </div>
      </div>
      <div className="w-10/12 overflow-hidden">
        {isLoad ? <Chart /> : <Skeleton className="w-full h-full rounded-md" />}
      </div>
    </div>
  );
}
