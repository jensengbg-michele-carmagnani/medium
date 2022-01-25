import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

interface ProviderOptions {
  clientId: string;
  clientSecret: string;
  params: {
    prompt: string;
    access_type: string;
    response_type: string;
  };
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider<ProviderOptions>({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // @ts-ignore
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    }),

    // ...add more providers here
  ],

  callbacks: {
    async jwt({ user, token, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.username,
          accessTokenExpires: account.expires_at! * 1000,
        };
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    
  },
});
