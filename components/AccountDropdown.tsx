"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Logoutform from "@/components/LogoutForm";
import { useState } from "react";

export function AccountDropdown({
  username,
  avatar_url,
}: {
  username: string;
  avatar_url: string;
}) {
  const [dialog, setDialog] = useState(false);

  return (
    <>
      <Dialog open={dialog} onOpenChange={(open) => setDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <p>
              <span className="font-bold">POST</span>{" "}
              <span className="font-light">
                https://viadukt-wild-forest-3032.fly.dev/api/calculation
              </span>
            </p>

            <DialogTitle>API</DialogTitle>
            <DialogDescription>
              <p className="text-sm text-gray-400">
                Send a JSON object to the API and get a response.
              </p>
            </DialogDescription>

            <div className="flex flex-col gap-2 mt-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="json">JSON Example:</Label>
                <Textarea
                  value={`{
  "data": [
    {
      "name": "current_energy_consumption",
      "value": 21
    },
    {
      "name": "upgraded_energy_consumption",
      "value": 193
    },
    {
      "name": "current_energy_price",
      "value": 193
    }
  ]
}

`}
                  id="json"
                  className="resize-none"
                  cols={30}
                  rows={10}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="response">Response:</Label>
                <Textarea
                  value={`{
  "status": "success",
  "message": "Calculation successful. Any feedback or suggestions? Please contact me at kj@mili-my.name",
  "projected_annual_savings": -398352,
  "energy_savings_percentage": -819.047619047619
}`}
                  id="response"
                  className="resize-none"
                  cols={30}
                  rows={10}
                  disabled
                />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
          <DropdownMenuItem onClick={() => setDialog(true)}>
            <Cloud className="mr-2 h-4 w-4" />
            <button>API</button>
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
    </>
  );
}
