import { Cloud, LogOut } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logoutform from "@/components/LogoutForm";

export function AccountDropdown({
  username,
  avatar_url,
}: {
  username: string;
  avatar_url: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Image
          src={avatar_url ? avatar_url : "/profile.jpeg"}
          width={30}
          height={30}
          alt="Image Logo"
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 cursor-pointer">
        <DropdownMenuLabel>
          Account
          <span className="block font-light  text-gray-400">{username}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <Logoutform action="/api/logout">
            <input type="submit" value="Abmelden" />
          </Logoutform>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
