"use client";

import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CostBlockForm from "@/components/CostBlockForm";
import { useCostBlockStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { calculationSchema } from "@/lib/validationSchema";
import * as z from "zod";

interface ContainerItems {
  [key: string]: string[];
  A: string[];
  B: string[];
}

const operators = ["+", "-", "*", "/"];

const Calculator = ({
  calculation,
}: {
  calculation: z.infer<typeof calculationSchema>;
}) => {
  const containers = ["A", "-", "B"];
  const [parent, setParent] = useState(null);
  const [containerItems, setContainerItems] = useState<ContainerItems>({
    A: [],
    B: [],
  });

  const [selectedOperator, setSelectedOperator] = useState<string>("+");
  const [saving, setSaving] = useState(false);

  const items = useCostBlockStore((state) => state.items);
  const removeAll = useCostBlockStore((state) => state.removeAll);

  const [result, setResult] = useState(0);

  function handleDragEnd(event: { over: any; active: any }) {
    const { over, active } = event;

    // Reset parent to `null` if the item is not over a container
    setParent(over ? over.id : null);

    if (over && !operators.includes(over.id)) {
      const newContainer = over.id;
      const activeItem = active.id;

      // Create a new object for container items
      const newContainerItems = { ...containerItems };

      // Remove the item from its previous container
      Object.keys(newContainerItems).forEach((key) => {
        newContainerItems[key] = newContainerItems[key].filter(
          (item) => item !== activeItem
        );
      });

      // Check if the target container already has an item
      if (newContainerItems[newContainer].length === 0) {
        newContainerItems[newContainer].push(activeItem);
      }

      setContainerItems(newContainerItems);
    } else {
      // If dropped outside, remove the item from all containers
      const newContainerItems = { ...containerItems };
      Object.keys(newContainerItems).forEach((key) => {
        newContainerItems[key] = newContainerItems[key].filter(
          (item) => item !== active.id
        );
      });

      setContainerItems(newContainerItems);
    }
  }

  const onSelect = (operator: string) => {
    setSelectedOperator(operator);
  };

  const handleRemoveAll = () => {
    removeAll();
    setContainerItems({ A: [], B: [] });
    setSelectedOperator("+");
    setResult(0);
  };

  const handleSave = () => {
    setSaving(true);

    if (items.length === 0) return;

    // Simulate a saving process with a delay
    setTimeout(async () => {
      // Perform actual save logic here

      // Remove ids from items and use from calculation schema
      // const itemsWithoutId = items.map((item) => {
      //   const { id, ...rest } = item;
      //   return rest;
      // });

      // const itemsWithoutId = items.map((item) => {
      //   calculation?.costBlocks.forEach((costBloc) => {
      //     item.id = costBloc.id;
      //     item.name = item.name;
      //     item.value = item.value;
      //     item.description = item.description;
      //   });

      //   return rest;
      // });

      // try {
      //   const res = await fetch("/api/calc", {
      //     method: "PATCH",
      //     body: JSON.stringify({
      //       id: calculation.id,
      //       schema: JSON.stringify(containerItems),
      //       selectedOperator,
      //       costBlocks: JSON.stringify(itemsWithoutId),
      //       result: +result,
      //     }),
      //   });
      //   const data = await res.json();
      //   console.log(data);
      // } catch (e) {
      //   console.log(e);
      // }
      // After saving is done, set `saving` to false
      setSaving(false);
    }, 2000); // 2 seconds delay
  };

  useEffect(() => {
    // Call the save function whenever relevant data changes
    handleSave();
  }, [containerItems, selectedOperator, items]);

  useEffect(() => {
    // Calculate the result using the selected operator
    let result = 0;
    const aValues = containerItems["A"].map(
      (item) => items.find((i) => i.id === item)?.value || 0
    );
    const bValues = containerItems["B"].map(
      (item) => items.find((i) => i.id === item)?.value || 0
    );

    const aSum = aValues.reduce((acc, val) => acc + val, 0);
    const bSum = bValues.reduce((acc, val) => acc + val, 0);

    switch (selectedOperator) {
      case "+":
        result = aSum + bSum;
        break;
      case "-":
        result = aSum - bSum;
        break;
      case "*":
        result = aSum * bSum;
        break;
      case "/":
        result = bSum !== 0 ? aSum / bSum : 0;
        break;
      default:
        result = 0;
    }

    const newResult = result.toFixed(2) as unknown as number;

    setResult(newResult);
  }, [containerItems, selectedOperator, items]);

  return (
    <>
      <section className="flex flex-col gap-10 max-w-4xl">
        <CostBlockForm />

        {items.length > 0 && (
          <>
            {saving ? (
              <p className="absolute  right-5">Saving...</p>
            ) : (
              <p className="absolute  right-5">Saved</p>
            )}

            <div className="flex flex-col flex-1  w-full   rounded-lg bg-slate-300 ">
              <h3 className="text-4xl font-bold bg-slate-400 text-white text-right rounded-t-lg p-5">
                {result}
              </h3>

              <DndContext onDragEnd={handleDragEnd}>
                <div
                  className={`absolute space-y-2 p-5 left-0 bg-slate-300 rounded-md`}>
                  <Button variant="destructive" onClick={handleRemoveAll}>
                    Remove All
                  </Button>

                  {items.map((item) => {
                    // Display the item if it is not in any container

                    const isInAnyContainer = Object.values(containerItems).some(
                      (container) => container.includes(item.id)
                    );

                    if (!isInAnyContainer) {
                      return (
                        <Draggable
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          value={item.value}>
                          {item.name}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                </div>

                <div className="flex gap-10 p-5 items-center">
                  {containers.map((id) => {
                    if (operators.includes(id)) {
                      // Render operator as a non-droppable element
                      return (
                        <Select key={id} onValueChange={onSelect}>
                          <SelectTrigger className="rounded-md w-14">
                            <SelectValue placeholder="+" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="-">-</SelectItem>
                              <SelectItem value="+">+</SelectItem>
                              <SelectItem value="/">/</SelectItem>
                              <SelectItem value="*">*</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      );
                    } else {
                      // Render other containers as droppable
                      return (
                        <Droppable key={id} id={id}>
                          {containerItems[id].length > 0 ? (
                            <>
                              {containerItems[id].map((itemName) => {
                                const item = items.find(
                                  (item) => item.id === itemName
                                );

                                if (!item) return null;
                                return (
                                  <Draggable
                                    key={item.id}
                                    name={item.name}
                                    value={item.value}
                                    id={item.id}>
                                    {item.name}
                                  </Draggable>
                                );
                              })}
                            </>
                          ) : (
                            "Drop here"
                          )}
                        </Droppable>
                      );
                    }
                  })}
                </div>
              </DndContext>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Calculator;
