import React, { FC } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProp {
  defaultValue: string;
  debounceChnageHandler: (item: string) => void;
}

const SearchBar: FC<SearchBarProp> = ({
  defaultValue,
  debounceChnageHandler,
}) => {
  return (
    <div className="relative ">
      <div className="absolute text-slate-600 top-2 left-2">
        <IoSearchOutline />
      </div>
      <input
        type="text"
        className="border border-gray-400/50 rounded-lg outline-none px-7 py-1"
        size={16}
        defaultValue={defaultValue}
        placeholder="Search"
        onChange={(e) => {
          debounceChnageHandler(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
