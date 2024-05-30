import CategoryAdd from "@/components/modal/CategoryAdd";
import CategoryUpdate from "@/components/modal/CategoryUpdate";
import ProductAdd from "@/components/modal/ProductAdd";
import ProductUpdate from "@/components/modal/ProductUpdate";
import React from "react";

const ModalProvider = () => {
  return (
    <>
      <CategoryAdd />
      <CategoryUpdate />
      <ProductAdd />
      <ProductUpdate />
    </>
  );
};

export default ModalProvider;
