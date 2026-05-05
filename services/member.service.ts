import prisma from '@/lib/prisma';

export async function editMember(
    memberId: string,
    updatedData: { name?: string; email?: string; dob?: Date; planId?: string },
) {
    const updatedMember = await prisma.member.update({
        where: { id: memberId },
        data: { ...updatedData },
    });

    console.log('Member updated successfully!', updatedMember);
    return updatedMember;
}

export async function deleteMember(memberId: string) {
    return await prisma.member.delete({ where: { id: memberId } });
}
