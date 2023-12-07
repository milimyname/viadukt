import jsonLogic from "json-logic-js";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({ message: "Hello from Next.js!" });
}

export async function POST(request: NextRequest) {
  const { logic, data } = await request.json();

  // Check that the request has the required parameters
  if (!logic || !data) {
    return new Response("Not found logic or data", {
      status: 401,
    });
  }

  // Check that the logic is valid
  try {
    const parsedLogic = JSON.parse(logic);
    const parsedData = JSON.parse(data);

    const result = jsonLogic.apply(parsedLogic, parsedData);

    return Response.json({ result });
  } catch (c) {
    console.log(c);
    return new Response("Invalid input, please provide valid jsons", {
      status: 401,
    });
  }
}
