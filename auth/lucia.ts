import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { nextjs_future } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";

const client = new PrismaClient();

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(), // NOT nextjs()
  adapter: prisma(client, {
    user: "user", // model User {}
    key: "key", // model Key {}
    session: "session", // model Session {}
  }),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      githubUsername: data.username,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
});

export type Auth = typeof auth;
