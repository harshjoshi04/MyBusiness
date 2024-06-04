"use client";
import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "@/context/useUser";
import { Order } from "@/lib/type";
import axios from "axios";
import API from "@/lib/apiRoute";
import { Spinner } from "@nextui-org/react";
import { MdDelete, MdEdit } from "react-icons/md";
import SearchBar from "@/components/SearchBar";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import useOrderUpdate from "@/context/useOrderUpdate";

const Home = () => {
  const { userData } = useUser();
  const queryClient = useQueryClient();
  const { setItem } = useOrderUpdate();
  const SearchParamas = useSearchParams();
  const router = useRouter();
  const handleDeleteOrder = async (id: string) => {
    await axios.delete(`${API.BILL}?id=${id}`);
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  const handleSearch = useCallback(
    debounce((val) => {
      router.replace(`/order?s=${val}`);
    }, 200),
    []
  );
  const { data: Orders, isLoading } = useQuery<Order[]>({
    queryKey: ["orders", userData?.id, SearchParamas.get("s")],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API.BILL}?id=${userData?.id}&${
          SearchParamas.get("s") ? `s=${SearchParamas.get("s")}` : ""
        }`
      );
      return data.data;
    },
  });
  return (
    <div className="mt-16 ">
      <p className="text-3xl font-bold my-3 flex items-center gap-1">
        <span>Orders</span>
        <span className="text-sm font-medium text-slate-400 pt-1">
          ({Orders?.length})
        </span>
      </p>
      <div className="relative mt-8">
        <SearchBar
          defaultValue={SearchParamas.get("s") || ""}
          debounceChnageHandler={handleSearch}
        />
      </div>
      <div className="mt-8 mr-6">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner
              classNames={{
                circle1: "border-b-green-500",
                circle2: "border-b-green-500",
              }}
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Bill No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>ProductName</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Total Payment</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!Orders?.length ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-lg font-medium ">
                    <div className="flex justify-center items-center">
                      Order Not Found !
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                Orders?.map((item, index) => (
                  <TableRow key={item?.id}>
                    <TableCell>{++index}</TableCell>
                    <TableCell>#{item?.billNumber}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.address}</TableCell>
                    <TableCell>{item?.phone}</TableCell>
                    <TableCell>{item?.productName}</TableCell>
                    <TableCell>{item?.category}</TableCell>
                    <TableCell>{item?.FullAmount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end items-center">
                        <button
                          className="flex justify-center items-center rounded-md w-6 h-7 bg-red-100 text-red-500"
                          onClick={() => handleDeleteOrder(item?.id)}
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
                ))
              )}
            </TableBody>
          </Table>
        )}
        {/* <div className="mt-6 flex items-center justify-end ">
          <Paginations />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
