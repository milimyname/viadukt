import jsonLogic from "json-logic-js";
import type { NextRequest } from "next/server";
import { formSchema } from "@/lib/validationSchema";
import prisma from "@/prisma/client";
import { logic } from "@/lib/utils";

export async function GET(request: NextRequest) {
  return Response.json({ message: "Hello from Next.js!" });
}

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
    await prisma.energyUpgrade.create({
      data: {
        user_id: body.user_id,
        selectedUpgrade: body.selected_upgrade,
        homeSize: body.home_size,
        currentEnergyConsumption: body.current_energy_consumption,
        energyPrice: body.energy_price,
        upgradeCosts: body.upgrade_costs,
        energySavingsPercentage: body.energy_savings_percentage,
        incentives: body.incentives,
      },
    });

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

    // Create a new entry in the database with the result
    await prisma.jsonLogic.create({
      data: {
        user_id: body.user_id,
        query: { logic },
        result: { data: result },
      },
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
