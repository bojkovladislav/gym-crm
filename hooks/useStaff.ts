import { useState, useEffect } from 'react';
import axios from 'axios';
import { StaffMember } from '@/features/Staff/Staff';
import { removeUser, updateUser } from '@/actions/user.action';
import { createStaffMember } from '@/actions/staff.action';
import { handleResponse } from '@/lib/handle-response';

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
        const response = await createStaffMember(data);

        handleResponse(response, {
            successMessage: 'Staff member added successfully!',
            onSuccess: async () => {
                await fetchStaff();
            },
            onError: (errorMessage) => {
                console.error('Staff member creating rejected:', errorMessage);
            },
        });
    };

    const editStaff = async (id: string, data: StaffMember) => {
        const response = await updateUser(id, data);

        handleResponse(response, {
            successMessage: 'Staff member updated successfully!',
            onSuccess: async () => {
                await fetchStaff();
            },
            onError: (errorMessage) => {
                console.error('Form submission rejected:', errorMessage);
            },
        });
    };

    const deleteStaff = async (id: string) => {
        const response = await removeUser(id);

        handleResponse(response, {
            successMessage: 'Staff member deleted successfully.',
            onSuccess: async () => {
                await fetchStaff();
            },
            onError: (errorMessage) => {
                console.error('Staff member deletion rejected:', errorMessage);
            },
        });
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStaff();
    }, []);

    return { staff, loading, addNewStaff, editStaff, deleteStaff };
};
