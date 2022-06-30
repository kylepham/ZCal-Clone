import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { pathname } = useRouter();
  const { data } = useSession();

  return (
    <nav className="mb-8 flex justify-between px-8 py-4">
      <Link href="/">ZcalClone</Link>

      {pathname !== "/login" && (
        <div className="space-x-8">
          {!!!data?.user && <Link href="/login">Login</Link>}

          <Link href="/about">About</Link>

          {!!data?.user && (
            <button
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
