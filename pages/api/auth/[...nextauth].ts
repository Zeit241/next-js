import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma';
import * as process from 'process';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'johndoe@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const username = credentials?.username,
          password = credentials?.password;
        const res = await prisma?.user.findUnique({
          where: {
            username: username,
          },
          select: {
            id: true,
            username: true,
            status: true,
            role: true,
          },
        });
        console.log(res);
        return res ? res : null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async signIn({ user, credentials }) {
      if (!user) return false;
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'production',
};
export default NextAuth(authOptions);
