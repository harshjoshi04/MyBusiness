import React from "react";

import { Pagination } from "@nextui-org/react";

const Paginations = () => {
  return (
    <Pagination
      classNames={{ cursor: "bg-green-500 text-white" }}
      total={10}
      initialPage={1}
    />
  );
};

export default Paginations;
