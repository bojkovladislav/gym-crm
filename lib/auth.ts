import 'dotenv';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client/index';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Reset your password',
                html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 12px; text-align: center;">
          
          <h2 style="margin-bottom: 16px; color: #111827;">
            Reset your password
          </h2>

          <p style="margin-bottom: 24px; color: #4b5563; font-size: 14px;">
            We received a request to reset your password. Click the button below to set a new one.
          </p>

          <a 
            href="${url}" 
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #2563eb;
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 500;
              margin-bottom: 24px;
            "
          >
            Reset password
          </a>

          <p style="font-size: 12px; color: #9ca3af;">
            If you didn’t request this, you can safely ignore this email.
          </p>

        </div>
      </div>
    `,
            });
        },
    },
});
