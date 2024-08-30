import React from "react";
import UserIdent from "./user_ident";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <div className="w-full h-24 shadow-md">
      <div className="flex h-full justify-between items-center px-4 max-w-[1292px] mx-auto">
        <UserIdent />
        <Input placeholder="Pesquise por um Job.." className="hidden md:block md:w-2/3" />
      </div>
    </div>
  );
}
