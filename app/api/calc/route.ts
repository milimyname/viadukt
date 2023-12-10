import type { NextRequest } from "next/server";
import { calculationSchema } from "@/lib/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = calculationSchema.safeParse(body);

  // Check that the request has the required parameters
  if (!validation.success) {
    return Response.json(validation.error.format(), {
      status: 400,
    });
  }

  try {
    const calculation = await prisma.calculation.create({
      data: {
        user_id: body.user_id,
        selectedOperator: "+",
        result: 0,
        name: body.name,
        type: body.type,
      },
    });

    return Response.json({
      calculationId: calculation.id,
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}
