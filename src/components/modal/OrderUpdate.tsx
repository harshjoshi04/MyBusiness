"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import useOrderUpdate from "@/context/useOrderUpdate";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import API from "@/lib/apiRoute";
import { useQueryClient } from "@tanstack/react-query";

interface OrderFormType {
  name: string;
  address: string;
  phone: string;
}

const OrderUpdate = () => {
  const { register, handleSubmit, reset, setValue } = useForm<OrderFormType>();
  const { isOpen, onClose, item } = useOrderUpdate();
  const [isDisable, setisDisable] = useState(false);

  const queryClient = useQueryClient();

  const handlUpdate: SubmitHandler<OrderFormType> = async (data) => {
    try {
      let obj = { ...data, id: item?.id };
      await axios.put(API.BILL, obj);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (er) {
    } finally {
      setisDisable(false);
      reset();
      onClose();
    }
  };
  useEffect(() => {
    if (!item) return;
    setValue("name", item?.name);
    setValue("address", item?.address);
    setValue("phone", item?.phone);
  }, [item]);
  return (
    <Modal isOpen={isOpen} onChange={onClose} title="Order Update">
      <form
        className="flex w-96 mx-auto gap-3 flex-col mt-6  "
        onSubmit={handleSubmit(handlUpdate)}
      >
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            disabled={isDisable}
            type="text"
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="address" className="font-medium">
            Name
          </label>
          <textarea
            {...register("address", { required: true })}
            id="name"
            disabled={isDisable}
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="phone" className="font-medium">
            Phone
          </label>
          <input
            {...register("phone", { required: true })}
            id="phone"
            disabled={isDisable}
            maxLength={10}
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
            "Update Order"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default OrderUpdate;
