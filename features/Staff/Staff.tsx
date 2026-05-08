'use client';

import { Role } from '@/config/nav-tabs';
import { PeopleManagement } from '../PeopleManagement';
import {
    fieldsToShow,
    getStaffActions,
    getStaffFields,
    tableHeaders,
} from './staff.config';
import { useStaff } from '@/hooks/useStaff';

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    role: Role;
}

export interface Props {
    userRole: Role;
}

export default function Staff({ userRole }: Props) {
    const { staff, loading, addNewStaff, editStaff, deleteStaff } = useStaff();

    const subTitle = `${userRole === Role.WORKER ? 'View' : 'Manage'} team roles, system access, and contact information.`;

    return (
        <PeopleManagement
            entityInPlural='Staff Members'
            entityInSingular='Staff Member'
            formTitle='Add Staff Member'
            subTitle={subTitle}
            people={staff}
            loading={loading}
            tableHeaders={tableHeaders}
            fieldsToShow={fieldsToShow}
            personInputs={getStaffFields()}
            personEditInputs={getStaffFields(true)}
            personActions={getStaffActions(deleteStaff)}
            addNewPerson={userRole === Role.WORKER ? undefined : addNewStaff}
            editPerson={editStaff}
        />
    );
}
