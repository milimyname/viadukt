import { redirect } from "next/navigation";
import { getPageSession } from "@/lib/getSession";
import { unstable_noStore } from "next/cache";
import QueryBuilderComponent from "@/components/QueryBuilderComponent";
import Link from "next/link";
import { CustomSheet } from "@/components/CustomSheet";
import { AccountDropdown } from "@/components/AccountDropdown";

const Page = async () => {
  // unstable_noStore();
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <>
      <header className="flex h-20 px-8 py-2 items-center justify-between border-b">
        <div className="flex gap-5">
          <CustomSheet />
          <ul className="flex gap-4 items-center">
            <li className="text-gray-600 hover:text-gray-600 ">
              <Link href="/">Überblick</Link>
            </li>
            <li className=" text-gray-400 hover:text-gray-600 ">
              <Link href="/">Produkte</Link>
            </li>
            <li className=" text-gray-400 hover:text-gray-600 ">
              <Link href="/">Einstellungen</Link>
            </li>
            <li className=" text-gray-400 hover:text-gray-600 ">
              <Link href="/">Über Uns</Link>
            </li>
          </ul>
        </div>

        <AccountDropdown
          session={{
            username: session.user.username,
            url: session.user.avatar_url,
          }}
        />
      </header>
      <main>
        <QueryBuilderComponent userId={session.user.userId} />
      </main>
    </>
  );
};

export default Page;
