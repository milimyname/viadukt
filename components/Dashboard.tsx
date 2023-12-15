"use client";

import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Flex,
  Metric,
  ProgressBar,
} from "@tremor/react";
import AreaChart from "@/components/AreaChart";
import LineChart from "@/components/LineChart";
import DatePicker from "@/components/DatePicker";

const categories = [
  {
    title: "Current Monthly Energy Usage (kWh)",
    metric: "$12,699",
    value: 15.9,
    target: "$80,000",
  },
  {
    title: "Current Price per kWh (in $/kWh)",
    metric: "$45,564",
    value: 36.5,
    target: "$125,000",
  },
  {
    title: "Buildings",
    metric: "1,072",
    value: 53.6,
    target: "2,000",
  },
];

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

export default function Dashboard() {
  return (
    <div className="px-8 w-full ">
      <div className="flex">
        <Title>Dashboard</Title>
        <DatePicker />
      </div>
      <TabGroup className="mt-2">
        <TabList variant="solid" className="mt-2">
          <Tab>Overview</Tab>
          <Tab disabled>Analytics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
              {categories.map((item) => (
                <Card key={item.title}>
                  <Text>{item.title}</Text>
                  <Metric>{item.metric}</Metric>
                  <Flex className="mt-4">
                    <Text className="truncate">{`${item.value}% (${item.metric})`}</Text>
                    <Text>{item.target}</Text>
                  </Flex>
                  <ProgressBar value={item.value} className="mt-2" />
                </Card>
              ))}
            </Grid>
            <div className="mt-6">
              <Card>
                <Title>Export/Import Growth Rates (1970 to 2021)</Title>
                <LineChart />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card className="p-0">
                <TabGroup>
                  <TabList>
                    <Tab className="p-4 sm:p-6 text-left">
                      <p className="text-sm sm:text-base">Visitors</p>
                      <Metric className="mt-2 text-inherit">
                        {numberFormatter(sumArray(data, "Visitors"))}
                      </Metric>
                    </Tab>
                    <Tab className="p-4 sm:p-6 text-left">
                      <p className="text-sm sm:text-base">Page views</p>
                      <Metric className="mt-2 text-inherit">
                        {numberFormatter(sumArray(data, "Page Views"))}
                      </Metric>
                    </Tab>
                    <Tab className="p-4 sm:p-6 text-left">
                      <p className="text-sm sm:text-base">Bounce rate</p>
                      <Metric className="mt-2 text-inherit">
                        {percentageFormatter(
                          sumArray(data, "Bounce Rate") / data.length
                        )}
                      </Metric>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel className="p-6">
                      <AreaChart categories="Visitors" />
                    </TabPanel>
                    <TabPanel className="p-6">
                      <AreaChart categories="Page Views" />
                    </TabPanel>
                    <TabPanel className="p-6">
                      <AreaChart categories="Bounce Rate" />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
