import type { NextRequest } from "next/server";
import { apiBuildingSchema } from "@/lib/validationSchema";
import {
  calculateEnergySavingsPercentage,
  calculateProjectedAnnualSavings,
} from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = apiBuildingSchema.safeParse(body);

  // Check that the request has the required parameters
  if (!validation.success) {
    return Response.json(validation.error.format(), {
      status: 400,
    });
  }

  try {
    return Response.json({
      status: "success",
      message:
        "Calculation successful. Any feedback or suggestions? Please contact me at kj@mili-my.name",
      projected_annual_savings: calculateProjectedAnnualSavings(
        body.data[0].value,
        body.data[1].value,
        body.data[2].value
      ),
      energy_savings_percentage: calculateEnergySavingsPercentage(
        body.data[0].value,
        body.data[1].value
      ),
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}
