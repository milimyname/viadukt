import { redirect } from "next/navigation";

import Form from "@/components/form"; // expect error - see next section
import { getPageSession } from "@/lib/getSession";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");
  return (
    <main className="h-screen flex items-center justify-center">
      <div className=" max-w-md p-10 gap-5 flex border rounded-md flex-col justify-center items-center ">
        <h1 className="font-bold text-4xl">Profile</h1>
        <p>User id: {session.user.userId}</p>
        <p>Username: {session.user.githubUsername}</p>
        <Form action="/api/logout">
          <input type="submit" value="Sign out" />
        </Form>
      </div>
    </main>
  );
};

export default Page;
