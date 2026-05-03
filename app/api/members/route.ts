import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, planId, keyFobId, dob } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required!' },
                { status: 400 },
            );
        }

        console.log(name, email, planId, keyFobId, dob);

        const newMember = await prisma.member.create({
            data: {
                name,
                email,
                planId,
                dob,
                status: 'INACTIVE',
                visits: 0,
                joinedAt: new Date(),
                keyFobId,
            },
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
