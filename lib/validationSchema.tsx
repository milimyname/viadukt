import * as z from "zod";

export const calculationSchema = z.object({
  result: z.number().min(1).multipleOf(0.01),
  name: z.string(),
  type: z.string(),
  selectedOperator: z.string(),
  id: z.string(),
});

export const costBlockSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  value: z.number().min(1).multipleOf(0.01),
  id: z.string(),
});
