import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const password = 'worker123password';
    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await prisma.user.upsert({
        where: { email: 'worker@gym.com' },
        update: {},
        create: {
            email: 'worker@gym.com',
            name: 'John Worker',
            passwordHash: hashedPassword,
            role: 'WORKER',
        },
    });

    console.log('✅ Success! Created worker:', worker.email);
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
