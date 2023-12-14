// import { getPageSession } from "@/lib/getSession";
// import { redirect } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import Calculator from "@/components/Calculator";
// import prisma from "@/prisma/client";

// const Page = async ({ params }: { params: { slug: string } }) => {
//   const session = await getPageSession();
//   if (!session) redirect("/login");

//   // Get the current calculation
//   const calculation = await prisma.calculation.findUnique({
//     where: { id: +params.slug },
//     include: { costBlocks: true },
//   });

//   if (!calculation) redirect("/");

//   return (
//     <>
//       <Navbar
//         username={session.user.username}
//         avatar_url={session.user.avatar_url}
//         userId={session.user.userId}
//       />
//       <main className="p-10 flex w-full justify-center gap-20 sm:px-0">
//         <Calculator calculation={calculation} />
//       </main>
//     </>
//   );
// };

// export default Page;
