"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUser from "@/context/useUser";
import API from "@/lib/apiRoute";
import { Category, Product } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoAdd, IoRemove } from "react-icons/io5";
import { toast } from "sonner";

type BillType = {
  name: string;
  address: string;
  phone: string;
  category: string;
  productName: string;
};

export default function Home() {
  const [Products, setProducts] = useState<Product[]>([]);
  const [Price, setPrice] = useState(0);
  const [ProductId, setProductId] = useState("");
  const [Stock, setStock] = useState(1);
  const [MaxStock, setMaxStock] = useState(0);
  const router = useRouter();
  const { register, handleSubmit, reset, getValues, setValue } =
    useForm<BillType>();
  const { userData } = useUser();
  const { data: Categorys } = useQuery<Category[]>({
    queryKey: ["CategoryList", userData?.id],
    queryFn: async () => {
      const { data } = await axios.get(`${API.CATEGORY}?id=${userData?.id}`);
      return data.data;
    },
  });

  const getDataProduct = async (name: string) => {
    setPrice((prev) => 0);
    setMaxStock((prev) => 0);
    setValue("productName", "");
    const { data } = await axios.get(
      `${API.PRODUCT}?id=${userData?.id}&c=${name}`
    );
    setProducts(data.data);
  };

  const handleAddBill: SubmitHandler<BillType> = (data) => {
    let obj = {
      userId: userData?.id,
      price: Price,
      stock: Stock,
      ...data,
      productId: ProductId,
    };
    toast.promise(axios.post(API.BILL, obj), {
      loading: "Loading...",
      success: () => {
        router.push("/order");
        reset();
        return "Bill Add Successfully !";
      },
      error: (er) => {
        console.log(er);
        router.push("/order");
        return "Something Went Wrong !";
      },
    });
  };
  return (
    <div className="mt-8">
      <p className="font-semibold text-xl">Create Bill</p>
      <form
        onSubmit={handleSubmit(handleAddBill)}
        className="flex w-7/12 gap-5 flex-col mt-6  "
      >
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="name" className="font-medium">
            Bill Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="address" className="font-medium">
            Address
          </label>
          <textarea
            {...register("address", { required: true })}
            id="address"
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="Phone" className="font-medium">
            Phone
          </label>
          <input
            {...register("phone", { required: true })}
            id="Phone"
            type="text"
            maxLength={10}
            className="border px-2 py-1 rounded-md  outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <label htmlFor="category" className="font-medium">
            Category
          </label>
          <Select
            onValueChange={(e) => {
              getDataProduct(e);
              setValue("category", e);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {Categorys?.map((item, index) => (
                <SelectItem key={index} value={`${item?.name}`}>
                  {item?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {getValues("category") &&
          (!Products?.length ? (
            <p className="text-red-500">
              Product is not available on {getValues("category")} category
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-0.5 w-full">
                <label htmlFor="product" className="font-medium">
                  Product
                </label>
                <Select
                  onValueChange={(e) => {
                    const [findProduct] = Products.filter((el) => el.id == e);
                    setValue("productName", findProduct?.productName);
                    setStock((prev) => 1);
                    setProductId((prev) => findProduct?.id as string);
                    setPrice((prev) => findProduct?.price);
                    setMaxStock((prev) => findProduct?.stock);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {Products?.map((item, index) => (
                      <SelectItem key={index} value={`${item?.id}`}>
                        {item?.productName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {!!(MaxStock && getValues("productName")) && (
                <>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="font-medium">Stock</p>
                    <div className="flex items-center">
                      <button
                        type="button"
                        disabled={Stock <= 1}
                        className="size-7 border flex justify-center items-center disabled:bg-black/10 outline-none"
                        onClick={() =>
                          !(Stock <= 1) && setStock((prev) => prev - 1)
                        }
                      >
                        <IoRemove />
                      </button>
                      <div className="size-7 border flex justify-center items-center tabular-nums">
                        {Stock}
                      </div>
                      <button
                        type="button"
                        disabled={MaxStock <= Stock}
                        className="size-7 border flex justify-center items-center disabled:bg-black/10 outline-none"
                        onClick={() =>
                          MaxStock >= Stock && setStock((prev) => prev + 1)
                        }
                      >
                        <IoAdd />
                      </button>
                    </div>
                  </div>
                  <p>
                    Total Price{" "}
                    <span className="font-medium">{Price * Stock}</span>...
                  </p>

                  <button
                    type="submit"
                    className="px-4 py-1.5 w-fit bg-green-500 text-base text-white font-medium rounded-xl border border-green-500 transition hover:bg-white hover:text-green-500 "
                  >
                    Creata Bill
                  </button>
                </>
              )}
            </>
          ))}
      </form>
    </div>
  );
}
