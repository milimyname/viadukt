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

  const costBlocks = [
    {
      name: "",
      value: 0,
      description: "",
    },
    {
      name: "",
      value: 0,
      description: "",
    },
  ];

  try {
    const calculation = await prisma.calculation.create({
      data: {
        user_id: body.user_id,
        selectedOperator: "+",
        result: 0,
        name: body.name,
        type: body.type,
        schema: body.schema,
        costBlocks: {
          create: costBlocks,
        },
      },
    });

    return Response.json({
      calculationId: calculation.id,
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  console.log(body);

  try {
    const calculation = await prisma.calculation.update({
      where: {
        id: body.id,
      },
      data: {
        selectedOperator: body.selectedOperator,
        result: body.result,
        schema: body.schema,
        costBlocks: {
          update: body.costBlocks,
        },
      },
    });

    return Response.json({
      calculationId: calculation.id,
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}
