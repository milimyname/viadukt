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
      <main className="max-w-md mx-auto py-10 ">
        <CalculationForm userId={session.user.userId} />
      </main>
    </>
  );
};

export default Page;
