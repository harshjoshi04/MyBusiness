"use client";
import SearchBar from "@/components/SearchBar";
import React, { useCallback } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductList from "@/components/ProductList";
import useProductAdd from "@/context/useProductAdd";
import { useQuery } from "@tanstack/react-query";
import { Product as productType } from "@/lib/type";
import axios from "axios";
import API from "@/lib/apiRoute";
import useUser from "@/context/useUser";
import { Spinner } from "@nextui-org/react";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const { onOpen } = useProductAdd();
  const searchParams = useSearchParams();
  const { userData } = useUser();
  const router = useRouter();
  const handleSearch = useCallback(
    debounce((str) => {
      router.replace(`/product?s=${str}`);
    }, 300),
    []
  );
  const handleProduct = async (): Promise<productType[]> => {
    try {
      let queryString = searchParams?.get("s");
      let query = "";
      if (queryString) query = `&s=${queryString}`;
      const { data } = await axios.get(
        `${API.PRODUCT}?id=${userData?.id}${query}`
      );
      return data.data;
    } catch (er) {
      throw new Error("Something Went Wrong !");
    }
  };
  const { data: products, isLoading } = useQuery({
    queryFn: handleProduct,
    queryKey: ["productList", userData?.id, searchParams?.get("s")],
    initialData: [],
  });
  return (
    <div className="mt-16 mr-6">
      <p className="text-3xl font-bold my-3 flex items-center gap-1">
        <span>Product</span>
      </p>
      <div className="flex justify-between items-center mt-8">
        <SearchBar
          defaultValue={`${searchParams?.get("s") || ""}`}
          debounceChnageHandler={handleSearch}
        />
        <button
          onClick={onOpen}
          className="px-4 py-1.5 bg-green-500 text-base text-white font-medium rounded-xl border border-green-500 transition hover:bg-white hover:text-green-500 "
        >
          Add Product
        </button>
      </div>
      <div className="mt-8">
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
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Base Price </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.length ? (
                products.map((item, index) => (
                  <ProductList item={item} key={item?.id} No={index + 1} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-lg font-medium ">
                    <div className="flex justify-center items-center">
                      Product Not Found !
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default page;
