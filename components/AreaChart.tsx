"use client";

import { AreaChart } from "@tremor/react";

const data = [
  {
    Month: "Jan 22",
    Visitors: 289,
    "Page Views": 1012,
    "Bounce Rate": 0.5,
  },
  //...
  {
    Month: "Jan 23",
    Visitors: 389,
    "Page Views": 1232,
    "Bounce Rate": 0.51,
  },
];

const numberFormatter = (value: number | bigint) =>
  Intl.NumberFormat("us").format(value).toString();

const percentageFormatter = (value: number) =>
  `${Intl.NumberFormat("us")
    .format(value * 100)
    .toString()}%`;

function sumArray(array: any[], metric: string | number) {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue[metric],
    0
  );
}

const LineChart = ({ categories }: { categories: string }) => {
  return (
    <AreaChart
      className="h-80 mt-10"
      data={data}
      index="Month"
      categories={[categories]}
      colors={["blue"]}
      valueFormatter={
        categories.includes("Bounce") ? percentageFormatter : numberFormatter
      }
      showLegend={false}
      yAxisWidth={50}
    />
  );
};

export default LineChart;
