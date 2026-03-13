"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar(){
    const session = useSession();
    return (
        <div className="flex justify-between">
            <div className="m-2 p-2 text-2xl font-bold">
                Melofi
            </div>
            <div>
                {session.data?.user && <button className="m-2 p-2 bg-blue-500 font-bold " onClick={() => signOut()}>logout</button> }
              {!session.data?.user &&   <button className="m-2 p-2 bg-blue-500 font-bold" onClick={() => signIn()}>signIn</button>}
            </div>
           
        </div>
       
       
    )
}

