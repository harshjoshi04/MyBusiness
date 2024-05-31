"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "@/components/SearchBar";
import { Spinner } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/lib/apiRoute";
import useUser from "@/context/useUser";
import { Category } from "@/lib/type";
import useCategoryAdd from "@/context/useCategoryAdd";
import axios from "axios";
import useCategoryUpdate from "@/context/useCategoryUpdate";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import debounce from "lodash.debounce";

export default function Home() {
  const { userData } = useUser();
  const search = useSearchParams();
  const router = useRouter();
  const debounceChnageHandler = useCallback(
    debounce((value) => {
      router.replace(`/category?s=${value}`);
    }, 300),
    []
  );
  const { onOpen } = useCategoryAdd();
  const { setItem } = useCategoryUpdate();
  const queryClient = useQueryClient();
  const { data: Categorys, isLoading } = useQuery<Category[]>({
    queryKey: ["categoryList", userData?.id, search?.get("s")],
    queryFn: async () => {
      let searchStr = search?.get("s") || "";
      let query = "";
      if (searchStr != null) query = `&s=${searchStr}`;
      const { data } = await axios.get(
        `${API.CATEGORY}?id=${userData?.id}${query}`
      );
      return data.data;
    },
  });

  const handleDelte = async (id: string) => {
    const { data } = await axios.delete(`${API.CATEGORY}?id=${id}`);
    queryClient.invalidateQueries(["categoryList"] as any);
  };
  return (
    <div className="mt-6">
      <p className="text-3xl font-bold mt-16">Categorys</p>
      <div className="flex justify-between items-center mr-6 mt-8">
        <SearchBar
          defaultValue={search?.get("s") || ""}
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
                            className="flex justify-center items-center rounded-md w-6 h-7 bg-red-100 text-red-500"
                            onClick={() => handleDelte(item?.id as string)}
                          >
                            <MdDelete size={20} />
                          </button>
                          <button className="flex justify-center items-center rounded-md w-6 h-7 bg-green-100 text-green-500">
                            <MdEdit size={20} onClick={() => setItem(item)} />
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
}
