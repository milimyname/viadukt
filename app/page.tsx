import { getPageSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import CalculationForm from "@/components/CalculationForm";
import Calculator from "@/components/Calculator";

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

        <Calculator />
      </main>
    </>
  );
};

export default Page;
