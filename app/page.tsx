import QueryBuilderComponent from "@/components/QueryBuilderComponent";
import { getPageSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <>
      <Navbar
        username={session.user.username}
        avatar_url={session.user.avatar_url}
      />
      <QueryBuilderComponent userId={session.user.userId} />
    </>
  );
};

export default Page;
