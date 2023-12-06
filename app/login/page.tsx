import { redirect } from "next/navigation";
import { getPageSession } from "@/lib/getSession";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const session = await getPageSession();
  if (session) redirect("/");
  return (
    <main className="h-screen flex items-center justify-center">
      <div className=" max-w-md p-10 gap-5 flex border rounded-md flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold">Sign in</h1>
        <Link
          href="/login/github"
          className={buttonVariants({ variant: "outline" })}>
          Sign in with GitHub{" "}
        </Link>
      </div>
    </main>
  );
};

export default Page;
