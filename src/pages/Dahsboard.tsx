import Card from "@/components/Card";
import Chart from "@/components/Chart";
import React from "react";

const Dahsboard = () => {
  return (
    <div className="w-full mt-7 flex flex-col gap-3">
      <p className="text-3xl font-bold">Welcome Savani</p>
      <p className="text-xl font-bold my-3 ">Overview</p>
      <div className="grid w-fit gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="w-10/12 flex items-center mt-6 flex-col xl:flex-row gap-16 ">
        <div className="w-10/12  h-48 rounded-lg">
          <p className="text-xl font-bold ">Recent Order</p>
          <div className="border"></div>
        </div>
        <div className="w-10/12">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dahsboard;
