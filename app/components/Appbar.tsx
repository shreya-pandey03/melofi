
"use client";

import { signOut,signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Appbar() {
  const  session  = useSession();
  return (
    <div className="flex justify-between px-5 py-4 md:px-10 xl:px-20">
      <div
        className="text-lg font-bold cursor-pointer"
      >
        Melofi
      </div>

      <div className="flex items-center gap-x-2">
        {session.data?.user  && <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => signOut()}
          >
            Logout
          </Button>}
           {session.data?.user  && <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => signIn()}
          >
            SignIn
          </Button>}
      </div>
    </div>
  );
}
