import { getPageSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import CalculationForm from "@/components/CalculationForm";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <>
      <Navbar
        username={session.user.username}
        avatar_url={session.user.avatar_url}
      />
      <main className="p-10 flex w-full justify-center gap-20 sm:px-0">
        {/* <CalculationForm userId={session.user.userId} /> */}
        <section className="flex flex-col  w-full child max-w-4xl  rounded-lg bg-slate-300 ">
          <h1 className="text-4xl font-bold bg-slate-600 text-white text-right rounded-t-lg p-5">
            $12323
          </h1>
          <div className="w-full p-5 flex gap-10">
            <div className="text-xl font-bold">X</div>
            <div className="text-xl font-bold">Y</div>
            <div className="text-xl font-bold">Z</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
