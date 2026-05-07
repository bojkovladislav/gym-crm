import { useState, useEffect } from 'react';
import axios from 'axios';
import { keyFobIdGenerator } from '@/helpers/keyFobIdGenerator';
import { formatDateString } from '@/helpers/formatters';
import { updateMember, removeMember } from '@/actions/member.action';
import { Member, Plan } from '@/features/Members/Members';

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [plans, setPlans] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [memberRes, planRes] = await Promise.all([
                axios.get('/api/members'),
                axios.get('/api/plans'),
            ]);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const planMap = planRes.data.reduce((acc: any, plan: Plan) => {
                acc[plan.id] = plan.name;
                return acc;
            }, {});

            setMembers(
                memberRes.data.map((m: Member) => ({
                    ...m,
                    joinedAt: formatDateString(m.joinedAt),
                    plan: planMap[m.planId],
                })),
            );

            setPlans(
                planRes.data.map((p: Plan) => ({
                    value: p.id,
                    label: `${p.name} (${p.price.toFixed(2)})`,
                })),
            );
        } finally {
            setLoading(false);
        }
    };

    const addNewMember = async (data: Member) => {
        const newMember = {
            ...data,
            dob: new Date(data.dob),
            keyFobId: keyFobIdGenerator(data.name, data.dob),
        };
        await axios.post('/api/members/', newMember);
        await fetchInitialData();
    };

    const editMember = async (id: string, data: Member) => {
        await updateMember(id, { ...data, dob: new Date(data.dob) });
        await fetchInitialData();
    };

    const deleteMember = async (id: string) => {
        await removeMember(id);
        await fetchInitialData();
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return { members, plans, loading, addNewMember, editMember, deleteMember };
};
