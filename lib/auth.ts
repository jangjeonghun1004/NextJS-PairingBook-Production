import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { Adapter } from "next-auth/adapters";

interface ExtendedUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

interface ExtendedToken extends JWT {
  id: string;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.hashedPassword) {
          throw new Error('등록되지 않은 이메일입니다.');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }): Promise<ExtendedToken> {
      if (user) {
        return {
          ...token,
          id: user.id
        };
      }
      return token as ExtendedToken;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: (token as ExtendedToken).id
        }
      };
    }
  }
}; 