import React from "react";
import UserIdent from "./user_ident";

export default function Header() {
  return (
    <div className="w-full h-24 shadow-md">
      <div className="flex h-full justify-between items-center px-4 max-w-7xl mx-auto">
        <UserIdent />
      </div>
    </div>
  );
}
