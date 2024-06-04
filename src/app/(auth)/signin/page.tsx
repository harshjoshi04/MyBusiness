"use client";
import React, { useState } from "react";
import { SiNginxproxymanager } from "react-icons/si";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type LoginForm = {
  username: string;
  password: string;
};

const Home = () => {
  const [isDisable, setisDisable] = useState(false);
  const { register, handleSubmit, reset } = useForm<LoginForm>();
  const router = useRouter();
  const handleLogin: SubmitHandler<LoginForm> = (data) => {
    setisDisable(true);
    toast.promise(signIn("sign-in", { ...data, redirect: false }), {
      loading: "Loading...",
      success: (data) => {
        setisDisable(false);
        reset();
        router.push("/");
        return "Login Successfully !";
      },
      error: (er) => {
        setisDisable(false);
        return "Username Or Password Went Wrong !";
      },
    });
  };
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex items-center gap-2 border-b py-4 px-3 text-xl font-medium">
        <div className="text-green-500">
          <SiNginxproxymanager size={25} />
        </div>
        <p>MyBusiness</p>
      </div>
      <div className="flex item-center justify-center w-[445px] mx-auto  h-[85%]  ">
        <div className="flex justify-center flex-col gap-2  w-full h-full">
          <p className="text-3xl font-medium">Login</p>
          <p className="text-sm">Hi,Welcome back 👋🏻</p>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex gap-3 flex-col mt-6  "
          >
            <div className="flex flex-col gap-0.5 w-full">
              <label htmlFor="username" className="font-medium">
                Username
              </label>
              <input
                disabled={isDisable}
                id="username"
                type="text"
                className="border px-2 py-1 rounded-md w-96 outline-none"
                {...register("username", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-0.5 w-full">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                disabled={isDisable}
                id="password"
                type="password"
                className="border px-2 py-1 rounded-md w-96 outline-none"
                {...register("password", { required: true })}
              />
            </div>
            <button
              disabled={isDisable}
              type="submit"
              className="w-96  py-2 mt-6 text-white bg-green-500 rounded-lg text-center"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
