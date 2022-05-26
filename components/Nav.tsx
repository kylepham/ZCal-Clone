import { NextComponentType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav: NextComponentType = () => {
  const { pathname } = useRouter();
  return (
    <nav className="flex justify-between px-8 py-4 bg-yellow-200">
      <Link href="/">ZcalClone</Link>
      {pathname !== "/login" && (
        <div className="space-x-8">
          <Link href="/login">Login</Link>
          <Link href="/about">About</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
