'use server';

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const plans = await prisma.plan.findMany();
        return NextResponse.json(plans, { status: 200 });
    } catch (error) {
        console.error('API Error Details:', error);

        return NextResponse.json(
            {
                error: 'Failed to fetch Plans',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        );
    }
}
