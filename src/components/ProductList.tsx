"use client";
import React, { FC, useEffect, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { IoAdd, IoRemove } from "react-icons/io5";
import { Product } from "@/lib/type";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import API from "@/lib/apiRoute";
import { useQueryClient } from "@tanstack/react-query";
import useProductUpdate from "@/context/useProductUpdate";

interface ProductListType {
  No: number;
  item: Product;
}

const ProductList: FC<ProductListType> = ({ item, No }) => {
  const [number, setnumber] = useState(item?.stock);
  const queryClient = useQueryClient();
  const { setItem } = useProductUpdate();
  const handleDelete = async (id: string | undefined) => {
    try {
      await axios.delete(`${API.PRODUCT}?id=${id}`);
      queryClient.invalidateQueries(["productList"] as any);
    } catch (er) {}
  };

  const handleStockManage = async (obj: {
    id: string | undefined;
    type: boolean;
  }) => {
    try {
      obj.type ? setnumber((prev) => prev + 1) : setnumber((prev) => prev - 1);
      obj.type ? (item.stock = item.stock + 1) : (item.stock = item.stock - 1);
      await axios.put(API.STOCK, obj);
    } catch (er) {}
  };
  useEffect(() => {
    setnumber(item?.stock);
  }, [item]);
  return (
    <TableRow>
      <TableCell className="font-medium">{No}</TableCell>
      <TableCell>{item?.productName}</TableCell>
      <TableCell>{item?.category?.name}</TableCell>
      <TableCell>{item?.basePrice}</TableCell>
      <TableCell>{item?.price}</TableCell>
      <TableCell>
        <div className="flex  items-center">
          <button
            disabled={number == 0}
            className="size-6 flex items-center justify-center border disabled:bg-black/5 "
            onClick={() => handleStockManage({ id: item?.id, type: false })}
          >
            <IoRemove />
          </button>
          <p className="size-6 px-2 py-0.5 border flex item-center justify-center tabular-nums ">
            {number}
          </p>
          <button
            className="size-6 flex items-center justify-center border disabled:bg-black/5"
            onClick={() => handleStockManage({ id: item?.id, type: true })}
          >
            <IoAdd />
          </button>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2 items-center justify-end">
          <button
            className="flex justify-center items-center rounded-md w-6 h-7 bg-red-100 text-red-500"
            onClick={() => handleDelete(item?.id)}
          >
            <MdDelete size={20} />
          </button>
          <button
            className="flex justify-center items-center rounded-md w-6 h-7 bg-green-100 text-green-500"
            onClick={() => setItem(item)}
          >
            <MdEdit size={20} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductList;
