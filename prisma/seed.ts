import prisma from '@/lib/prisma';

async function main() {
    const plans = [
        {
            name: 'STANDARD',
            price: 29.99,
        },
        {
            name: 'PREMIUM',
            price: 59.99,
        },
        {
            name: 'VIP',
            price: 99.99,
        },
    ];

    console.log('--- Start seeding plans ---');

    for (const plan of plans) {
        const result = await prisma.plan.upsert({
            where: { name: plan.name },
            update: {
                price: plan.price, // Updates price if the plan already exists
            },
            create: plan,
        });
        console.log(`Seeded plan: ${result.name}`);
    }

    console.log('--- Seeding finished! ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
