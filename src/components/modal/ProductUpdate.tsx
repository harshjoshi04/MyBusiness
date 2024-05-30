"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import useProductUpdate from "@/context/useProductUpdate";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/lib/type";
import axios from "axios";
import API from "@/lib/apiRoute";
import useUser from "@/context/useUser";
import { Spinner } from "@nextui-org/react";

interface ProductType {
  productName: string;
  categoryId: string;
  basePrice: number;
  price: number;
  stock: number;
}

const ProductUpdate = () => {
  const [isDisable, setisDisable] = useState(false);
  const { isOpen, item, onClose } = useProductUpdate();
  const queryClient = useQueryClient();
  const { register, reset, handleSubmit, setValue } = useForm<ProductType>();
  const { userData } = useUser();
  const handleGetCategory = async (): Promise<Category[]> => {
    try {
      const { data } = await axios.get(`${API.CATEGORY}?id=${userData?.id}`);
      return data.data;
    } catch (er) {
      throw new Error("Something Went Wrong !");
    }
  };
  const handleUpdateData: SubmitHandler<ProductType> = async (data) => {
    try {
      setisDisable(true);
      let obj = { ...data, id: item?.id };
      obj["categoryId"] =
        (data?.categoryId as string) || (item?.categoryId as string);
      await axios.put(API.PRODUCT, { ...obj });
      queryClient.invalidateQueries(["productList"] as any);
    } catch (er) {
    } finally {
      reset();
      setisDisable(false);
      onClose();
    }
  };
  const { data: Category } = useQuery({
    queryFn: handleGetCategory,
    queryKey: ["productCategory", userData?.id],
  });
  useEffect(() => {
    if (item) {
      setValue("productName", item?.productName);
      setValue("categoryId", item?.categoryId);
      setValue("basePrice", item?.basePrice);
      setValue("price", item?.price);
      setValue("stock", item?.stock);
    }
  }, [item?.id]);
  return (
    <Modal
      title="Porduct Update"
      isOpen={isOpen}
      onChange={() => {
        reset();
        onClose();
      }}
    >
      <form
        onSubmit={handleSubmit(handleUpdateData)}
        className="flex w-96 mx-auto gap-3 flex-col mt-6  "
      >
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name" className="font-medium">
            Product Name
          </label>
          <input
            id="name"
            disabled={isDisable}
            type="text"
            className="border px-2 py-1 rounded-md  outline-none"
            {...register("productName", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="category" className="font-medium">
            Category
          </label>
          <Select
            disabled={isDisable}
            onValueChange={(e) => setValue("categoryId", e)}
            defaultValue={item?.categoryId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {Category?.map((item, index) => (
                <SelectItem key={index} value={`${item?.id}`}>
                  {item?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="base" className="font-medium">
            Base Price
          </label>
          <input
            id="base"
            disabled={isDisable}
            type="number"
            {...register("basePrice", {
              required: true,
            })}
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="price" className="font-medium">
            Price
          </label>
          <input
            id="price"
            disabled={isDisable}
            type="number"
            {...register("price", { required: true })}
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="stock" className="font-medium">
            Stock
          </label>
          <input
            id="stock"
            disabled={isDisable}
            type="number"
            {...register("stock", { required: true })}
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <button
          disabled={isDisable}
          type="submit"
          className="  py-2 mt-6 text-white bg-green-500 rounded-lg text-center"
        >
          {isDisable ? (
            <Spinner
              size="sm"
              classNames={{
                circle2: "border-b-white",
                circle1: "border-b-white",
              }}
            />
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default ProductUpdate;
