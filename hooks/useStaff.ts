import { useState, useEffect } from 'react';
import axios from 'axios';
import { StaffMember } from '@/features/Staff/Staff';
import { updateUser } from '@/actions/user.action';
import { deleteUser } from '@/services/user.service';
import { authClient } from '@/lib/auth-client';
import { createStaffMember } from '@/actions/staff.action';

export const useStaff = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/staff');
            setStaff(response.data);
        } catch (error) {
            console.error('Failed to fetch staff:', error);
        } finally {
            setLoading(false);
        }
    };

    const addNewStaff = async (data: StaffMember) => {
        await createStaffMember(data);
        await fetchStaff();
    };

    const editStaff = async (id: string, data: StaffMember) => {
        await updateUser(id, data);
        await fetchStaff();
    };

    const deleteStaff = async (id: string) => {
        await deleteUser(id);
        await fetchStaff();
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStaff();
    }, []);

    return { staff, loading, addNewStaff, editStaff, deleteStaff };
};
