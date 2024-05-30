"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import useProductAdd from "@/context/useProductAdd";
import { Spinner } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "@/context/useUser";
import axios from "axios";
import API from "@/lib/apiRoute";
import { Category as CategoryType } from "@/lib/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type ProductForm = {
  productName: string;
  categoryId: string;
  basePrice: number;
  price: number;
  stock: number;
};

const ProductAdd = () => {
  const { isOpen, onClose } = useProductAdd();
  const [isDisable, setisDisable] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<ProductForm>();
  const { userData } = useUser();
  const handleGetCategory = async (): Promise<CategoryType[]> => {
    try {
      const { data } = await axios.get(`${API.CATEGORY}?id=${userData?.id}`);
      return data.data;
    } catch (er) {
      throw new Error("Something Went Wrong !");
    }
  };
  const { data: Category } = useQuery({
    queryFn: handleGetCategory,
    queryKey: ["productCategory", userData?.id],
  });

  const handleAddProduct: SubmitHandler<ProductForm> = async (data) => {
    try {
      setisDisable(true);
      let obj = { ...data, userId: userData?.id };
      await axios.post(API.PRODUCT, obj);
      queryClient.invalidateQueries(["productList"] as any);
      toast.success("Product Add Successfully !");
    } catch (er) {
      toast.error("Something Went Wrong !");
    } finally {
      setisDisable(false);
      reset();
      onClose();
    }
  };
  return (
    <Modal
      title="Porduct Add"
      isOpen={isOpen}
      onChange={() => {
        reset();
        onClose();
      }}
    >
      <form
        onSubmit={handleSubmit(handleAddProduct)}
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
            {...register("productName", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="category" className="font-medium">
            Category
          </label>
          <Select
            disabled={isDisable}
            onValueChange={(e) => setValue("categoryId", e)}
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
            {...register("basePrice", { required: true })}
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

export default ProductAdd;
