import OrderTable from "@/components/OrderTable";
import Paginations from "@/components/Paginations";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Orders = () => {
  return (
    <div className="mt-16 ">
      <p className="text-3xl font-bold my-3 flex items-center gap-1">
        <span>Orders</span>
        <span className="text-sm font-medium text-slate-400 pt-1">(200)</span>
      </p>
      <div className="relative mt-8">
        <div className="absolute text-slate-600 top-2 left-2">
          <IoSearchOutline />
        </div>
        <input
          type="text"
          className="border border-gray-400/50 rounded-lg outline-none px-7 py-1"
          size={16}
          placeholder="Search"
        />
      </div>
      <div className="mt-8 mr-6">
        <OrderTable />
        <div className="mt-6 flex items-center justify-end ">
          <Paginations />
        </div>
      </div>
    </div>
  );
};

export default Orders;
