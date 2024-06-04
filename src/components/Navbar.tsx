"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { LuShoppingCart } from "react-icons/lu";
import { BsBox } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { SiNginxproxymanager } from "react-icons/si";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineClipboardList } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import TooltipProvider from "./TooltipProvider";
import useGetUser from "@/hook/useGetUser";
import { CgLogOut } from "react-icons/cg";
import { signOut } from "next-auth/react";
const Navbar = () => {
  useGetUser();
  const [isMenu, setisMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [NavItem] = useState([
    {
      id: 1,
      href: "/",
      title: "Dashboard",
      Icon: FiHome,
    },
    {
      id: 2,
      href: "/order",
      title: "Order",
      Icon: LuShoppingCart,
    },
    {
      id: 4,
      href: "/category",
      title: "Category",
      Icon: ImTree,
    },
    {
      id: 3,
      href: "/product",
      title: "Product",
      Icon: BsBox,
    },
    {
      id: 5,
      href: "/bill",
      title: "Create Bill",
      Icon: HiOutlineClipboardList,
    },
  ]);
  return (
    <div
      className={twMerge(
        `flex min-w-[300px] h-full relative transition-all duration-200 ease-linear`,
        isMenu && "min-w-[80px] mx-4 "
      )}
    >
      <div className="fixed  h-full flex flex-col  mx-5 ">
        <button
          className="my-6 font-medium text-xl cursor-pointer flex items-center gap-3 mx-auto"
          onClick={() => setisMenu(!isMenu)}
        >
          <div className="text-green-500">
            <SiNginxproxymanager />
          </div>
          <span
            className={twMerge(
              "transition-all duration-200 ease-linear ",
              isMenu && "hidden"
            )}
          >
            MyBusiness
          </span>
        </button>
        <ul className="space-y-2 flex-1">
          {NavItem?.map(({ id, href, title, Icon }) => (
            <li
              key={id}
              className={twMerge(
                ` w-48 py-1 pl-4 rounded-lg font-normal cursor-pointer transition-all duration-200 ease-linear`,
                isMenu && "w-auto pl-0 p-2 ",
                pathname === href && "bg-slate-200/50"
              )}
            >
              <Link href={href} className="flex items-center gap-3 ">
                <TooltipProvider title={title} isOpen={isMenu}>
                  <Icon size={20} />
                </TooltipProvider>
                <p
                  className={twMerge(
                    "transition-all duration-200 ease-linear",
                    isMenu && "hidden"
                  )}
                >
                  {title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            signOut();
            router.push("/signin");
          }}
          className="my-6 px-2 font-medium  cursor-pointer flex items-center gap-3 mx-auto "
        >
          <TooltipProvider title={"Logout"} isOpen={isMenu}>
            <CgLogOut size={20} />
          </TooltipProvider>
          <span
            className={twMerge(
              "transition-all duration-200 ease-linear",
              isMenu && "hidden"
            )}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
