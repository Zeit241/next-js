import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {UserData} from "@/types/userdata";
import {redirect} from "next/navigation";

export default async function ProtectLayout({children}: { children: ReactNode }) {

    const session: {user: UserData} | null = await getServerSession(authOptions)
    console.log(session)
    if(!session) return redirect('/');
    return (
        <html lang="en">
            <head/>
            <body>
                {children}
            </body>
        </html>
    )
}