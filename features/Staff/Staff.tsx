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
    image: string;
    role: Role;
}

export default function Staff() {
    const { staff, loading, addNewStaff, editStaff, deleteStaff } = useStaff();

    return (
        <PeopleManagement
            entityInPlural='Staff Members'
            entityInSingular='Staff Member'
            formTitle='Add Staff Member'
            subTitle='Manage team roles, system access, and contact information.'
            people={staff}
            loading={loading}
            tableHeaders={tableHeaders}
            fieldsToShow={fieldsToShow}
            personInputs={getStaffFields()}
            personActions={getStaffActions(deleteStaff)}
            addNewPerson={addNewStaff}
            editPerson={editStaff}
        />
    );
}
