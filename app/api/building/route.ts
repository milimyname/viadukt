import type { NextRequest } from "next/server";
import { buildingSchema } from "@/lib/validationSchema";
import prisma from "@/prisma/client";
import {
  calculateEnergySavingsPercentage,
  calculateProjectedAnnualSavings,
} from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Convert date string to Date object
  const date = new Date(body.upgrade_date);
  const newBody = {
    ...body,
    upgrade_date: date,
  };

  const validation = buildingSchema.safeParse(newBody);

  // Check that the request has the required parameters
  if (!validation.success) {
    return Response.json(validation.error.format(), {
      status: 400,
    });
  }

  try {
    await prisma.building.create({
      data: {
        userId: body.user_id,
        name: body.name,
        upgrade_date: body.upgrade_date,
        upgraded_energy_consumption: body.upgraded_energy_consumption,
        energy_savings_percentage: calculateEnergySavingsPercentage(
          body.current_energy_consumption,
          body.upgraded_energy_consumption
        ),
        projected_annual_savings: calculateProjectedAnnualSavings(
          body.current_energy_consumption,
          body.upgraded_energy_consumption,
          body.current_energy_price
        ),
        current_energy_price: body.current_energy_price,
        current_energy_consumption: body.current_energy_consumption,
      },
    });

    return Response.json({
      status: "success",
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}
