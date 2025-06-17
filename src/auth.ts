import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InactiveUserError, InvalidEmailPasswordError } from "./utils/errors"
import { sendRequest } from "./utils/api"
import { IUser } from "./types/next-auth"
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          body: {
            username: credentials.username,
            password: credentials.password
          }
        });
        if (+res.statusCode === 201) {

          return {
            _id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            access_token: res.data?.access_token,
            expires_at: res.data?.expires_at
          };
        }

        if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError()
        }
        if (+res.statusCode === 400) {
          throw new InactiveUserError()
        } else {
          throw new Error("Internal server")
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.user = (user as IUser)
        token.access_expire = +token.user.expires_at
      } else if (Date.now() < token.access_expire * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token")
 
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
            }),
          })
 
          const tokensOrError = await response.json()
 
          if (!response.ok) throw tokensOrError
 
          const newTokens = tokensOrError as {
            access_token: string
            expires_in: number
            refresh_token?: string
          }
 
          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refresh_token: newTokens.refresh_token
              ? newTokens.refresh_token
              : token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access_token", error)
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError"
          return token
        }
      }
      return token
    },
    session({ session, token }) {
      (session.user as IUser) = token.user
      return session
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
})