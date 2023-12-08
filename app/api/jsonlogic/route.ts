import jsonLogic from "json-logic-js";
import type { NextRequest } from "next/server";
import { formSchema } from "@/lib/validationSchema";
import { logic } from "../calculation/route";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = formSchema.safeParse(body);

  // Check that the request has the required parameters
  if (!validation.success) {
    return Response.json(validation.error.format(), {
      status: 400,
    });
  }

  try {
    // Calculate the energy savings by using the json-logic-js library
    const result = jsonLogic.apply(logic, {
      selected_upgrade: body.selected_upgrade,
      home_size: body.home_size,
      current_energy_consumption: body.current_energy_consumption,
      energy_price: body.energy_price,
      upgrade_costs: body.upgrade_costs,
      energy_savings_percentage: body.energy_savings_percentage,
      incentives: body.incentives,
    });

    return Response.json({
      totalCost: result[0],
      annualSavings: result[1],
      netCost: result[2],
      returnOnInvestment: result[3],
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}
