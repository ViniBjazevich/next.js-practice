import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex gap-2 p-5 bg-blue-500">
      <Link className="px-2 py-1 bg-white text-blue-500 rounded-lg" href={"/"}>
        Home
      </Link>
      <Link
        className="px-2 py-1 bg-white text-blue-500 rounded-lg"
        href={"/todos"}
      >
        Todos
      </Link>
    </header>
  );
}
