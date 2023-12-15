"use client";

import { BarChart as TremorBarChart } from "@tremor/react";

const valueFormatter = (number: number | bigint) =>
  `$${new Intl.NumberFormat("us").format(number).toString()}`;

const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
  },
  {
    name: "Arachnids",
    "Number of threatened species": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
  },
];
const BarChart = () => {
  return (
    <TremorBarChart
      className="mt-6 h-96"
      data={chartdata}
      index="name"
      categories={["Number of threatened species"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={60}
    />
  );
};

export default BarChart;
