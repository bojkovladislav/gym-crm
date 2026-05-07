import { getSessionOnServer } from '@/lib/auth-server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const session = await getSessionOnServer();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Failed to obtain user id' },
                { status: 401 },
            );
        }

        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: session.user.id,
                },
            },
        });

        return NextResponse.json(users, { status: 201 });
    } catch (error) {
        console.error('Failed to get users', error);

        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 },
        );
    }
}
