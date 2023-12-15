"use client";
import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from "@tremor/react";
import { useState } from "react";

const DatePicker = () => {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  return (
    <DateRangePicker
      className="max-w-md ml-auto sm:flex hidden"
      value={value}
      onValueChange={setValue}
      maxDate={new Date()}
      selectPlaceholder="Select range"
      color="rose">
      <DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
        Select range
      </DateRangePickerItem>
      <DateRangePickerItem
        key="today"
        value="today"
        from={new Date()}
        to={new Date()}>
        Today
      </DateRangePickerItem>
      <DateRangePickerItem
        key="lastWeekToToday"
        value="lastWeekToToday"
        from={new Date(new Date().setDate(new Date().getDate() - 7))}
        to={new Date()}>
        Last 7 days
      </DateRangePickerItem>
      <DateRangePickerItem
        key="lastMonthToToday"
        value="lastMonthToToday"
        from={new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)}
        to={new Date()}>
        Month to Today
      </DateRangePickerItem>
    </DateRangePicker>
  );
};

export default DatePicker;
