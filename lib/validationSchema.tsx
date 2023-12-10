import * as z from "zod";

export const formSchema = z.object({
  selected_upgrade: z.string(),
  home_size: z.number().min(1).multipleOf(0.01),
  current_energy_consumption: z.number().min(1).multipleOf(0.01),
  energy_price: z.number().min(1).multipleOf(0.01),
  upgrade_costs: z.number().min(1).multipleOf(0.01),
  energy_savings_percentage: z.number().min(1).multipleOf(0.01),
  incentives: z.number().multipleOf(0.01).optional(),
});

export const costBlockSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  value: z.number().min(1).multipleOf(0.01),
  id: z.string().optional(),
});
