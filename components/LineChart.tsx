"use client";

import { LineChart as TremorLineChart } from "@tremor/react";

const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat("us").format(number).toString()}`;

const LineChart = ({
  buildings,
}: {
  buildings: {
    createdAt: Date;
  }[];
}) => {
  // Count the number of buildings per year
  const countPerYear = buildings.reduce<Record<number, number>>(
    (acc, building) => {
      const year = building.createdAt.getFullYear();
      if (!acc[year]) acc[year] = 0;
      acc[year] += 1;
      return acc;
    },
    {}
  );

  // Convert the counts into the chart data format
  const chartData = Object.entries(countPerYear).map(([year, count]) => ({
    year: parseInt(year),
    Buildings: count,
  }));

  return (
    <TremorLineChart
      className="mt-6 h-96"
      data={chartData}
      index="year"
      categories={["Buildings"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={40}
    />
  );
};

export default LineChart;
