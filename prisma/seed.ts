import { EventType } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';

async function main() {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();

    const mockEvents = [
        {
            title: 'PT Session: Sarah J. (Trainer: Mike)',
            type: EventType.TRAINER_SESSION,
            start: new Date(y, m, d, 13, 0),
            end: new Date(y, m, d, 14, 0),
            amount: 45.0,
            isCompleted: false,
        },
        {
            title: 'Morning Yoga Flow (Trainer: Elena)',
            type: EventType.TRAINER_SESSION,
            start: new Date(y, m, d + 1, 7, 0),
            end: new Date(y, m, d + 1, 8, 30),
            amount: 60.0,
            isCompleted: false,
        },
        {
            title: 'Powerlifting Group (Trainer: Chris)',
            type: EventType.TRAINER_SESSION,
            start: new Date(y, m, d, 17, 0),
            end: new Date(y, m, d, 18, 30),
            amount: 80.0,
            isCompleted: false,
        },
        {
            title: 'Bodybuilding 101 (Trainer: Mike)',
            type: EventType.TRAINER_SESSION,
            start: new Date(y, m, d + 2, 10, 0),
            end: new Date(y, m, d + 2, 11, 0),
            amount: 45.0,
            isCompleted: false,
        },
    ];

    console.log('Start seeding...');

    for (const event of mockEvents) {
        await prisma.event.create({
            data: event,
        });
    }

    console.log('Seeding finished!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
