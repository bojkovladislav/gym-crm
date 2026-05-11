import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phoneNumber, planId, keyFobId, dob } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required!' },
                { status: 400 },
            );
        }

        const newMember = await prisma.$transaction(async (tx) => {
            const currentPlan = await prisma.plan.findUnique({
                where: { id: planId },
                select: { name: true, price: true },
            });

            if (!currentPlan) {
                throw new Error('Plan not found');
            }

            const member = await tx.member.create({
                data: {
                    name,
                    email,
                    phoneNumber,
                    planId,
                    dob: dob ? new Date(dob) : null,
                    status: 'INACTIVE',
                    visits: 0,
                    joinedAt: new Date(),
                    keyFobId,
                },
            });

            await tx.transaction.create({
                data: {
                    amount: currentPlan.price,
                    type: 'INCOME',
                    description: `${currentPlan.name} Subscription - ${member.name}`,
                    category: 'Subscription',
                    memberId: member.id,
                },
            });

            return member;
        });

        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        console.error('Failed to create member:', error);

        return NextResponse.json(
            { error: 'Internal server error!' },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        const members = await prisma.member.findMany({
            orderBy: { joinedAt: 'desc' },
        });

        return NextResponse.json(members, { status: 201 });
    } catch (error) {
        console.error('Failed to get members', error);

        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 },
        );
    }
}
