import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { sendEmail } from "./email";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        to: user.email!,
        subject: "Verify your email",
        text: `Click the following link to verify your email: ${url}`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
  // hooks: {
  //   before: createAuthMiddleware(async ctx => {
  //     if (
  //       ctx.path === '/sign-up/email' ||
  //       ctx.path === '/reset-password' ||
  //       ctx.path === '/change-password'
  //     ) {
  //       const password = ctx.body.password || ctx.body.newPassword;
  //     }
  //   })
  // }
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
