"use client";

import { LineChart as TremorLineChart } from "@tremor/react";

const chartdata = [
  {
    year: 1970,
    "Export Growth Rate": 2.04,
  },
  {
    year: 1971,
    "Export Growth Rate": 1.96,
  },
  {
    year: 1972,
    "Export Growth Rate": 1.96,
  },
  {
    year: 1973,
    "Export Growth Rate": 1.93,
  },
  {
    year: 1974,
    "Export Growth Rate": 1.88,
  },
  //...
];

const valueFormatter = (number: number) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const LineChart = () => {
  return (
    <TremorLineChart
      className="mt-6 h-96"
      data={chartdata}
      index="year"
      categories={["Export Growth Rate"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={40}
    />
  );
};

export default LineChart;
