import Link from "next/link";
import { CustomSheet } from "@/components/CustomSheet";
import { AccountDropdown } from "@/components/AccountDropdown";
import { ModeToggle } from "@/components/ModeToggle";

const Navbar = ({
  username,
  avatar_url,
  userId,
}: {
  username: string;
  avatar_url: string;
  userId?: string;
}) => {
  const links = [
    { href: "/", label: "Overview" },
    { href: "/", label: "Products" },
    { href: "/", label: "Settings" },
    { href: "/", label: "About us" },
  ];

  return (
    <header className="flex h-20 px-8 py-2 items-center justify-between border-b">
      <div className="flex gap-5">
        <CustomSheet userId={userId} />
        <ul className=" sm:gap-4 hidden sm:flex sm:items-center">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link
                href={href}
                className={`text-gray-600 hover:text-gray-600 
                ${label === "Overview" && "text-gray-800 font-medium"}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <AccountDropdown username={username} avatar_url={avatar_url} />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
