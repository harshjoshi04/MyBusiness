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
import useCategoryAdd from "@/context/useCategoryAdd";

import { MdDelete, MdEdit } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "@/lib/apiRoute";
import useUser from "@/context/useUser";
import { Spinner } from "@nextui-org/react";
import { Category as CategoryType } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import SearchBar from "@/components/SearchBar";
import useCategoryUpdate from "@/context/useCategoryUpdate";

const page = () => {
  const searchParams = useSearchParams();
  const { onOpen } = useCategoryAdd();
  const queryClient = useQueryClient();
  const { setItem } = useCategoryUpdate();
  const { userData } = useUser();
  const router = useRouter();

  const debounceChnageHandler = useCallback(
    debounce((value) => {
      router.replace(`/category?s=${value}`);
    }, 300),
    []
  );

  const handleGetCategory = async (): Promise<CategoryType[]> => {
    try {
      let search = searchParams?.get("s");
      let query = "";
      if (search) {
        query = `&s=${search}`;
      }
      const { data } = await axios.get(
        `${API.CATEGORY}?id=${userData?.id}${query}`
      );
      return data.data;
    } catch (er) {
      throw new Error("Something Went Wrong !");
    }
  };
  const {
    data: Categorys,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categoryList", userData?.id, searchParams?.get("s")],
    queryFn: handleGetCategory,
    initialData: [],
  });

  const handleDelete = async (id: string | undefined) => {
    try {
      await axios.delete(`${API.CATEGORY}?id=${id}`);
      queryClient?.invalidateQueries({
        queryKey: ["categoryList", "productCategory"],
      });
    } catch (er) {}
  };

  return (
    <div className="mt-6">
      <p className="text-3xl font-bold mt-16">Categorys</p>
      <div className="flex justify-between items-center mr-6 mt-8">
        <SearchBar
          defaultValue={`${searchParams?.get("s") || ""}`}
          debounceChnageHandler={debounceChnageHandler}
        />
        <button
          onClick={onOpen}
          className="px-4 py-1.5 bg-green-500 text-base text-white font-medium rounded-xl border border-green-500 transition hover:bg-white hover:text-green-500 "
        >
          Add Category
        </button>
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
        ) : isError ? (
          <div className="text-center text-red-500">
            Failed to load categories.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">No</TableHead>
                <TableHead>Category</TableHead>

                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!Categorys?.length ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-6 text-center font-medium text-base "
                  >
                    Category Not Found !
                  </TableCell>
                </TableRow>
              ) : (
                Categorys?.map((item, index) => {
                  return (
                    <TableRow key={item?.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center justify-end">
                          <button
                            onClick={() => handleDelete(item?.id)}
                            className="flex justify-center items-center rounded-md w-6 h-7 bg-red-100 text-red-500"
                          >
                            <MdDelete size={20} />
                          </button>
                          <button
                            onClick={() => setItem(item)}
                            className="flex justify-center items-center rounded-md w-6 h-7 bg-green-100 text-green-500"
                          >
                            <MdEdit size={20} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default page;
