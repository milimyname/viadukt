import { redirect } from "next/navigation";

import Form from "@/components/form"; // expect error - see next section
import { getPageSession } from "@/lib/getSession";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");
  return (
    <>
      <h1>Profile</h1>
      <p>User id: {session.user.userId}</p>
      <p>Username: {session.user.githubUsername}</p>
      <Form action="/api/logout">
        <input type="submit" value="Sign out" />
      </Form>
    </>
  );
};

export default Page;
