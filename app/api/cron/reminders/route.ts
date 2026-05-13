import prisma from '@/lib/prisma';
import { EmailService } from '@/services/email.service';
import { NextResponse } from 'next/server';

export async function GET() {
    const threeDaysFromNow = new Date();

    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const expiringMembers = await prisma.member.findMany({
        where: {
            subscriptionEndDate: { equals: threeDaysFromNow },
            autoRenew: false,
        },
    });

    for (const member of expiringMembers) {
        await EmailService.sendRenewalReminder(member.id);
    }

    return NextResponse.json({ processed: expiringMembers.length });
}
