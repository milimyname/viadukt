// import type { NextRequest } from "next/server";
// import { costBlockSchema } from "@/lib/validationSchema";
// import prisma from "@/prisma/client";

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validation = costBlockSchema.safeParse(body);

//   // Check that the request has the required parameters
//   if (!validation.success) {
//     return Response.json(validation.error.format(), {
//       status: 400,
//     });
//   }

//   try {
//     const costBlock = await prisma.costBlock.create({
//       data: {
//         calculation_id: body.calculationId,
//         name: body.name,
//         description: body.description,
//         value: body.value,
//       },
//     });

//     return Response.json({
//       id: costBlock.id,
//     });
//   } catch (c) {
//     return Response.json({ message: c }, { status: 500 });
//   }
// }

// export async function DELETE() {
//   try {
//     await prisma.costBlock.deleteMany();

//     return Response.json({ message: "success" });
//   } catch (c) {
//     return Response.json({ message: c }, { status: 500 });
//   }
// }
