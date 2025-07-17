import React from "react";
import { siteConfig } from "../config/siteConfig";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

type HeaderProps = {
  role: string;
};

export default function Header({ role }: HeaderProps) {
  return (
    <header className="border-b-2">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span className="font-semibold">{siteConfig.name}</span>
            <p className="text-xs">
              <span className="capitalize">{role}</span> Dashboard
            </p>
          </div>
        </div>
        <div>
          <Button asChild variant="destructive">
            <SignOutButton />
          </Button>
        </div>
      </div>
    </header>
  );
}
