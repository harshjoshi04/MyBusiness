"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { LuShoppingCart } from "react-icons/lu";
import { BsBox } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { LuUsers2 } from "react-icons/lu";
const Navbar = () => {
  const [isMenu, setisMenu] = useState(false);
  const [NavItem] = useState([
    {
      id: 1,
      title: "Dashboard",
      Icon: FiHome,
      className: "bg-slate-200/50",
    },
    {
      id: 2,
      title: "Order",
      Icon: LuShoppingCart,
      className: "",
    },
    {
      id: 3,
      title: "Product",
      Icon: BsBox,
      className: "",
    },
    {
      id: 4,
      title: "Customers",
      Icon: LuUsers2,
      className: "",
    },
  ]);
  return (
    <nav
      className={twMerge(
        `flex min-w-[300px] h-full flex-col items-center transition duration-200 `,
        isMenu && "min-w-[80px] mx-4"
      )}
    >
      <p
        className="my-6 font-medium text-xl cursor-pointer"
        onClick={() => setisMenu(!isMenu)}
      >
        Admin
      </p>
      <ul className="space-y-2">
        {NavItem?.map(({ id, title, Icon, className }) => (
          <li
            key={id}
            className={twMerge(
              `flex items-center gap-3  w-48 py-1 pl-4 rounded-lg font-normal cursor-pointer`,
              isMenu && "w-auto pl-0 p-2 ",
              className
            )}
          >
            <Icon size={20} />
            <p className={twMerge(isMenu && "hidden")}>{title}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
