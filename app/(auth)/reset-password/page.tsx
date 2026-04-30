import ResetPassword from '@/features/ResetPassword/ResetPassword';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const token = resolvedParams.token;

    return <ResetPassword token={token} />;
}
