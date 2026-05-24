import { useState, useEffect } from 'react';
import { formatDateString } from '@/helpers/formatters';
import {
    updateMember,
    removeMember,
    getActiveTrainersAction,
    memberCheckInAction,
    getMembersAction,
    createMemberAction,
} from '@/actions/member.action';
import { Member, Plan } from '@/features/Members/Members';
import { handleResponse } from '@/lib/handle-response';
import { getPlansAction } from '@/actions/plans.action';

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
        setLoading(true);

        const [membersResponse, plansResponse] = await Promise.all([
            getMembersAction(),
            getPlansAction(),
        ]);

        setLoading(false);

        const [membersData, membersError] = membersResponse;
        const [plansData, plansError] = plansResponse;

        handleResponse(membersResponse, {
            onError: (errorMessage) => {
                console.error('Fetch members rejected:', errorMessage);
            },
        });

        handleResponse(plansResponse, {
            onError: (errorMessage) => {
                console.error('Fetch plans rejected:', errorMessage);
            },
        });

        if (
            membersError ||
            plansError ||
            membersData === null ||
            plansData === null
        ) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const planMap = plansData.reduce((acc: any, plan: Plan) => {
            acc[plan.id] = plan.name;
            return acc;
        }, {});

        setMembers(
            membersData.map((member) => ({
                ...member,
                dob: formatDateString(member.dob),
                joinedAt: formatDateString(member.joinedAt),
                plan: planMap[member.planId],
            })),
        );

        setPlans(
            plansData.map((p: Plan) => ({
                value: p.id,
                label: `${p.name} (${p.price.toFixed(2)})`,
            })),
        );
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

    const addNewMember = async (newMember: Member) => {
        const response = await createMemberAction(newMember);

        handleResponse(response, {
            successMessage: 'New member created successfully!',
            onSuccess: async () => {
                await fetchInitialData();
            },
            onError: (errorMessage) => {
                console.error('New member creation rejected:', errorMessage);
            },
        });
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
        fetchInitialData();
        getTrainers();
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
