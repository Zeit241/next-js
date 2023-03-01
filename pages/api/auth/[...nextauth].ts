import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import {prisma} from "@/prisma/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "johndoe@test.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const username = credentials?.username, password = credentials?.password
                const res = await prisma?.user.findUnique({
                    where: {
                        username: username
                    },
                    select:{
                        id: true,
                        username: true,
                        status: true,
                        role: true
                    }
                })
                return res ? res : null
            }
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user = token.user
            }
            return session;
        },
    },
    secret: "test",
    debug: true
}
export default NextAuth(authOptions);