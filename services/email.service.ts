import prisma from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const EmailService = {
    async sendRenewalReminder(memberId: string) {
        const member = await prisma.member.findUnique({
            where: { id: memberId },
        });

        if (!member || !member.email || !member.subscriptionEndDate)
            return { success: false, error: 'No email found.' };

        try {
            await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: member.email,
                subject: 'Your Membership is Expiring Soon!',
                html: `<p>Hi ${member.name}, your membership ends on ${member.subscriptionEndDate.toLocaleDateString()}. Renew now to keep your streak!</p>`,
            });
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    },
};
