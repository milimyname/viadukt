import * as z from "zod";

export const costBlockSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  value: z.number().min(1).multipleOf(0.01),
  id: z.string(),
});

export const calculationSchema = z.object({
  result: z.number().min(1).multipleOf(0.01),
  name: z.string(),
  type: z.string(),
  selectedOperator: z.string(),
  schema: z.string(),
  costBlocks: z.array(costBlockSchema).optional(),
  id: z.string(),
});

export const buildingSchema = z.object({
  name: z.string(),
  upgrade_type: z.string().default("Basic"),
  upgrade_date: z.date(),
  upgraded_energy_consumption: z.number().min(1).multipleOf(0.01),
  current_energy_price: z.number().min(1).multipleOf(0.01),
  current_energy_consumption: z.number().min(1).multipleOf(0.01),
});
