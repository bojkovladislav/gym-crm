'use client';

import { PageHeader } from '@/components/PageHeader';
import { Stack } from '@mantine/core';
import { EquipmentStats } from './EquipmentStats';
import { useEffect, useState } from 'react';
import { EquipmentCategory, EquipmentStatus } from '@/app/generated/prisma';
import EquipmentContent from './EquipmentContent';
import EquipmentFilter from './EquipmentFilter';
import { equipmentInputs } from './equipment.config';
import { useEquipment } from '@/hooks/useEquipment';

export interface Equipment {
    id: string;
    name: string;
    category: EquipmentCategory;
    status: EquipmentStatus;
    serialNumber: string | null;
    location: string | null;
    purchaseDate: Date | null;
    lastServiced: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count?: {
        maintenanceLogs: number;
    };
}

export interface MaintenanceRequestData {
    requestTitle: string;
    date: string;
    startTime: string;
    finishTime: string;
    cost: number;
}

interface Props {
    readOnly: boolean;
}

export default function EquipmentLog({ readOnly }: Props) {
    const {
        equipment,
        stats,
        loading,
        addNewEquipment,
        editEquipment,
        removeEquipment,
        requestMaintenance,
        fetchEquipment,
    } = useEquipment();

    const [filters, setFilters] = useState({
        search: '',
        category: null,
        status: null,
    });

    const handleFilterChange = (key: string, value: string | null) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchEquipment({
                search: filters.search,
                category: filters.category || undefined,
                status: filters.status || undefined,
            });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [filters]);

    return (
        <Stack>
            <PageHeader
                entityInPlural='Equipment Log'
                entityInSingular='Equipment'
                subTitle={`Track gym assets, monitor machine status${!readOnly ? ', and manage maintenance.' : ''}`}
                formTitle={!readOnly ? 'Log New Gym Equipment' : undefined}
                onSubmit={!readOnly ? addNewEquipment : undefined}
                inputs={!readOnly ? equipmentInputs : undefined}
            />

            <EquipmentStats stats={stats} />

            <EquipmentFilter
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            <EquipmentContent
                readOnly={readOnly}
                loading={loading}
                equipment={equipment}
                removeEquipment={removeEquipment}
                inputs={equipmentInputs}
                editEquipment={editEquipment}
                requestMaintenance={requestMaintenance}
            />
        </Stack>
    );
}
