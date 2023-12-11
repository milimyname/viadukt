import jsonLogic from "json-logic-js";
import type { NextRequest } from "next/server";
// import { calculationSchema } from "@/lib/validationSchema";
// import prisma from "@/prisma/client";
// import { logic } from "@/lib/utils";

export async function GET(request: NextRequest) {
  return Response.json({ message: "Hello from Next.js!" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Convert body data to an object
  const data = body.data.reduce((acc, cur) => {
    acc[cur.name] = cur.value;
    return acc;
  }, {});

  try {
    // Calculate the energy savings by using the json-logic-js library
    //@ts-ignore
    const result = jsonLogic.apply(
      {
        "+": [{ var: "a" }, { var: "b" }],
      },
      data
    );

    return Response.json({
      type: "JsonLogic: Addition",
      result,
    });
  } catch (c) {
    return Response.json({ message: c }, { status: 500 });
  }
}
