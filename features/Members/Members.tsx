'use client';

import { PeopleManagement } from '../PeopleManagement';
import { useMembers } from '@/hooks/useMembers';
import {
    fieldsToShow,
    getPersonActions,
    getPersonFields,
    tableHeaders,
} from './members.config';

export interface Member {
    id: string;
    keyFobId: string;
    dob: string;
    name: string;
    email: string;
    planId: string;
    status: string;
    visits: number;
    joinedAt: string;
}

export interface Plan {
    id: string;
    name: string;
    price: number;
}

export default function Members() {
    const { members, plans, loading, addNewMember, editMember, deleteMember } =
        useMembers();

    return (
        <PeopleManagement
            entityInPlural='Members'
            entityInSingular='Member'
            formTitle='Add New Member'
            subTitle='Manage members here'
            people={members}
            loading={loading}
            tableHeaders={tableHeaders}
            fieldsToShow={fieldsToShow}
            personInputs={getPersonFields(plans)}
            personActions={getPersonActions(deleteMember)}
            addNewPerson={addNewMember}
            editPerson={editMember}
        />
    );
}
