import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, role } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required!' },
                { status: 400 },
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'A staff member with this email already exists.' },
                { status: 409 },
            );
        }

        const newStaffMember = await prisma.user.create({
            data: {
                name,
                email,
                emailVerified: true,
                image: '',
                role,
            },
        });

        console.log(newStaffMember);

        return NextResponse.json(newStaffMember, { status: 201 });
    } catch (error) {
        console.error('Failed to create user:', error);

        return NextResponse.json(
            { error: 'Internal server error!' },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json(users, { status: 201 });
    } catch (error) {
        console.error('Failed to get users', error);

        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 },
        );
    }
}
