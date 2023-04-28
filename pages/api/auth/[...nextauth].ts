import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { AuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

const adminEmails = ["amertahawy111@gmail.com", "elfathstore.ymka@gmail.com"];

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`
    }),
  ],
};

export default NextAuth(authOptions);

export const isAdminRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user.email && !adminEmails.includes(session.user.email)) throw new Error("Not Admin");
};