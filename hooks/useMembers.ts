import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDateString } from '@/helpers/formatters';
import {
    updateMember,
    removeMember,
    getActiveTrainersAction,
    memberCheckInAction,
} from '@/actions/member.action';
import { Member, Plan } from '@/features/Members/Members';
import { handleResponse } from '@/lib/handle-response';

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [activeTrainers, setActiveTrainers] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
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

    const checkIn = async (memberId: string) => {
        const response = await memberCheckInAction(memberId);

        handleResponse(response, {
            successMessage: 'Member checked in successfully!',
            onSuccess: async () => {
                await fetchInitialData();
            },
            onError: (errorMessage) => {
                console.error('Member check in rejected:', errorMessage);
            },
        });
    };

    const getTrainers = async () => {
        const response = await getActiveTrainersAction();
        const [data] = response;

        handleResponse(response, {
            onSuccess: () => {
                if (data !== null) {
                    setActiveTrainers(data);
                }
            },
            onError: (errorMessage) => {
                console.error('Trainers fetch rejected:', errorMessage);
            },
        });
    };

    const addNewMember = async (data: Member) => {
        const newMember = {
            ...data,
            dob: new Date(data.dob),
        };

        await axios.post('/api/members/', newMember);
        await fetchInitialData();
    };

    const editMember = async (id: string, data: Member) => {
        const response = await updateMember(id, {
            ...data,
            dob: new Date(data.dob),
        });

        handleResponse(response, {
            successMessage: 'Member edited successfully!',
            onSuccess: async () => {
                await fetchInitialData();
            },
            onError: (errorMessage) => {
                console.error('Member edit rejected:', errorMessage);
            },
        });
    };

    const deleteMember = async (id: string) => {
        const response = await removeMember(id);

        handleResponse(response, {
            successMessage: 'Member deleted successfully!',
            onSuccess: async () => {
                await fetchInitialData();
            },
            onError: (errorMessage) => {
                console.error('Member deletion rejected:', errorMessage);
            },
        });
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getTrainers();
        fetchInitialData();
    }, []);

    return {
        members,
        plans,
        activeTrainers,
        loading,
        addNewMember,
        editMember,
        deleteMember,
        checkIn,
    };
};
