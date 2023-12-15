import * as z from "zod";

export const buildingSchema = z.object({
  name: z.string(),
  upgrade_type: z.string().default("Basic"),
  upgrade_date: z.date(),
  upgraded_energy_consumption: z.number().min(1).multipleOf(0.01),
  current_energy_price: z.number().min(1).multipleOf(0.01),
  current_energy_consumption: z.number().min(1).multipleOf(0.01),
});
