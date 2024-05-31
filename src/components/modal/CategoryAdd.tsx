"use client";
import useCategoryAdd from "@/context/useCategoryAdd";
import React, { useState } from "react";
import Modal from "../Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "@/context/useUser";
import { Spinner } from "@nextui-org/react";
import { toast } from "sonner";
import axios from "axios";
import API from "@/lib/apiRoute";
import { useQueryClient } from "@tanstack/react-query";

interface Category {
  name: string;
}

const CategoryAdd = () => {
  const { register, reset, handleSubmit } = useForm<Category>();
  const { userData } = useUser();
  const queryClient = useQueryClient();
  const [isDisable, setisDisable] = useState(false);
  const { isOpen, onClose } = useCategoryAdd();

  const handleAddCategory: SubmitHandler<Category> = async ({ name }) => {
    try {
      setisDisable(true);
      let obj = { name, id: userData?.id };
      await axios.post(API.CATEGORY, obj);
      toast.success("Category Add Successfully !");
      queryClient.invalidateQueries(["categoryList", "productCategory"] as any);
      onClose();
    } catch (er) {
      toast.error("Something Went Wrong !");
    } finally {
      reset();
      setisDisable(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onChange={onClose} title="Add Category">
      <form
        onSubmit={handleSubmit(handleAddCategory)}
        className="flex w-96 mx-auto gap-3 flex-col mt-6  "
      >
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="name" className="font-medium">
            Category Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            disabled={isDisable}
            type="text"
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
            "Add"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default CategoryAdd;
