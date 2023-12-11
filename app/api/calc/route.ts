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
        schema: body.schema,
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
  try {
    const body = await request.json();
    const costBlocks = JSON.parse(body.costBlocks);

    if (costBlocks[0])
      await prisma.costBlock.update({
        where: {
          id: costBlocks[0].id,
        },
        data: {
          name: costBlocks[0].name,
          description: costBlocks[0].description,
          value: costBlocks[0].value,
        },
      });

    if (costBlocks[1])
      await prisma.costBlock.update({
        where: {
          id: costBlocks[1].id,
        },
        data: {
          name: costBlocks[1].name,
          description: costBlocks[1].description,
          value: costBlocks[1].value,
        },
      });

    const calculation = await prisma.calculation.update({
      where: {
        id: body.id,
      },
      data: {
        selectedOperator: body.selectedOperator,
        schema: body.schema,
      },
    });

    return Response.json({
      calculationId: calculation.id,
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}
