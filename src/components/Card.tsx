"use client";
import React, { FC } from "react";
import CountUp from "react-countup";

interface CardProp {
  title: string;
  num: number | undefined;
}

const Card: FC<CardProp> = ({ title, num }) => {
  return (
    <div className="flex flex-col w-52 h-28 tabular-nums border justify-center pl-5 font-normal gap-1 text-sm shadow-md rounded-2xl">
      <p>{title}</p>
      <p className="text-3xl font-bold">
        <CountUp end={num || 0} duration={2} />
      </p>
    </div>
  );
};

export default Card;
