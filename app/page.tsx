import 'dotenv';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    const cookieStore = await cookies();
    const authToken = process.env.BETTER_AUTH_TOKEN || '';
    const token = cookieStore.get(authToken)?.value;

    if (token) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }
}

// TODO: ADD Error message in case of failed authentication
// TODO: Start doing the dashboard