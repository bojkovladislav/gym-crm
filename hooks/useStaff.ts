import { useState, useEffect } from 'react';
import axios from 'axios';
import { StaffMember } from '@/features/Staff/Staff';
import { updateUser } from '@/actions/user.action';
import { deleteUser } from '@/services/user.service';

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
        console.log('data: ', data);

        await axios.post('/api/staff', data);
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
        fetchStaff();
    }, []);

    return { staff, loading, addNewStaff, editStaff, deleteStaff };
};
