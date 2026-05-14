'use client';

import { PeopleManagement } from '../PeopleManagement';
import {
    fieldsToShow,
    getStaffActions,
    getStaffFields,
    tableHeaders,
} from './staff.config';
import { useStaff } from '@/hooks/useStaff';
import { UserRole } from '@/app/generated/prisma';

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    role: UserRole;
    baseSalary: number;
}

export interface Props {
    userRole: UserRole;
}

export default function Staff({ userRole }: Props) {
    const { staff, loading, addNewStaff, editStaff, deleteStaff } = useStaff();

    const subTitle = `${userRole === UserRole.WORKER ? 'View' : 'Manage'} team roles, system access, and contact information.`;

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
            addNewPerson={
                userRole === UserRole.WORKER ? undefined : addNewStaff
            }
            editPerson={editStaff}
        />
    );
}
