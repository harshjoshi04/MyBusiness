"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import useCategoryUpdate from "@/context/useCategoryUpdate";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category } from "@prisma/client";
import useUser from "@/context/useUser";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import API from "@/lib/apiRoute";
import { useQueryClient } from "@tanstack/react-query";

const CategoryUpdate = () => {
  const { register, reset, handleSubmit, setValue } = useForm<Category>();
  const [isDisable, setisDisable] = useState(false);
  const queryClient = useQueryClient();
  const { isOpen, item, onClose } = useCategoryUpdate();
  const handleUpdateData: SubmitHandler<Category> = async (data) => {
    try {
      setisDisable(true);
      let obj = { id: item?.id, name: data.name };
      await axios.put(API.CATEGORY, obj);
      queryClient?.invalidateQueries([
        "categoryList",
        "productCategory",
      ] as any);
      onClose();
    } catch (er) {
    } finally {
      setisDisable(false);
    }
  };
  useEffect(() => {
    if (item) setValue("name", item?.name);
  }, [item]);
  return (
    <Modal isOpen={isOpen} onChange={onClose} title="Update Category">
      <form
        onSubmit={handleSubmit(handleUpdateData)}
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
            className="border px-2 py-1 rounded-md  outline-none "
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
            "Update"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default CategoryUpdate;
