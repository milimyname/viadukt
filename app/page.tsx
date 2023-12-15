import { getPageSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <>
      <Navbar
        username={session.user.username}
        avatar_url={session.user.avatar_url}
      />
      <main className="py-2 px-0 sm:p-10 flex w-full justify-center gap-20 sm:px-0">
        {/* <CalculationForm userId={session.user.userId} /> */}
        <Dashboard />
      </main>
    </>
  );
};

export default Page;
