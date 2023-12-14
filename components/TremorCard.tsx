"use client";

import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";

const TremorCard = () => (
  <Card className="max-w-xs mx-auto">
    <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
  </Card>
);

export default TremorCard;
