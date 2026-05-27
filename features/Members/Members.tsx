'use client';

import { PeopleManagement } from '../PeopleManagement';
import { useMembers } from '@/hooks/useMembers';
import {
    fieldsToShow,
    getPersonActions,
    getPersonFields,
    tableHeaders,
} from './members.config';
import { useState } from 'react';
import { AttendanceLogModal } from './AttendanceLogModal';

export interface Member {
    id: string;
    keyFobId: string | null;
    dob: string;
    name: string;
    assignedTrainerId: string | null;
    subscriptionStartDate: Date | null;
    subscriptionEndDate: Date | null;
    email: string;
    phoneNumber: string;
    planId: string;
    status: string;
    visits: number;
    joinedAt: string;
}

export interface Visit {
    id: number;
    memberId: string;
    visitDate: Date;
}

export interface Plan {
    id: string;
    name: string;
    price: number;
}

export default function Members() {
    const {
        members,
        plans,
        visits,
        loading,
        activeTrainers,
        addNewMember,
        getAttendanceLog,
        editMember,
        deleteMember,
        checkIn,
    } = useMembers();

    const [attendanceModalOpened, setAttendanceModalOpened] = useState(false);

    async function toggleAttendanceModal(memberId: string) {
        setAttendanceModalOpened(!attendanceModalOpened);

        await getAttendanceLog(memberId);
    }

    return (
        <>
            <AttendanceLogModal
                opened={attendanceModalOpened}
                onClose={() => setAttendanceModalOpened(false)}
                visits={visits}
            />

            <PeopleManagement
                entityInPlural='Members'
                entityInSingular='Member'
                formTitle='Add New Member'
                subTitle='View, edit, and onboard new gym members.'
                people={members}
                loading={loading}
                tableHeaders={tableHeaders}
                fieldsToShow={fieldsToShow}
                personInputs={getPersonFields(plans, activeTrainers)}
                personActions={getPersonActions(
                    deleteMember,
                    checkIn,
                    toggleAttendanceModal,
                )}
                addNewPerson={addNewMember}
                editPerson={editMember}
            />
        </>
    );
}
