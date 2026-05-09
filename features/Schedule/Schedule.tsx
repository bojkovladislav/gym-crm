'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventType } from '@/app/generated/prisma/enums';

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export const MOCK_EVENTS = [
    // --- MAINTENANCE EVENTS (Red / Expenses) ---
    {
        id: '1',
        title: 'Treadmill #4 Motor Replacement',
        type: 'MAINTENANCE' as EventType,
        start: new Date(y, m, d, 9, 0), // Today at 9 AM
        end: new Date(y, m, d, 11, 0), // Ends at 11 AM
        amount: 250.0,
        equipmentId: 'eq_1',
        isCompleted: false,
    },
    {
        id: '2',
        title: 'Cable Fly Lubrication',
        type: 'MAINTENANCE' as EventType,
        start: new Date(y, m, d + 1), // Tomorrow (All day)
        end: new Date(y, m, d + 1),
        amount: 50.0,
        equipmentId: 'eq_2',
        isCompleted: false,
    },
    {
        id: '3',
        title: 'Bench Press Re-upholstery',
        type: 'MAINTENANCE' as EventType,
        start: new Date(y, m, d - 2, 14, 0), // 2 days ago
        end: new Date(y, m, d - 2, 16, 0),
        amount: 120.0,
        equipmentId: 'eq_3',
        isCompleted: true,
    },

    // --- TRAINER SESSIONS (Blue / Revenue) ---
    {
        id: '4',
        title: 'PT Session: Sarah J. (Trainer: Mike)',
        type: 'TRAINER_SESSION' as EventType,
        start: new Date(y, m, d, 13, 0), // Today at 1 PM
        end: new Date(y, m, d, 14, 0),
        amount: 45.0, // Gym rent fee
        isCompleted: false,
    },
    {
        id: '5',
        title: 'Morning Yoga Flow (Trainer: Elena)',
        type: 'TRAINER_SESSION' as EventType,
        start: new Date(y, m, d + 1, 7, 0), // Tomorrow at 7 AM
        end: new Date(y, m, d + 1, 8, 30),
        amount: 60.0,
        isCompleted: false,
    },
    {
        id: '6',
        title: 'Powerlifting Group (Trainer: Chris)',
        type: 'TRAINER_SESSION' as EventType,
        start: new Date(y, m, d, 17, 0), // Today at 5 PM
        end: new Date(y, m, d, 18, 30),
        amount: 80.0,
        isCompleted: false,
    },
    {
        id: '7',
        title: 'Bodybuilding 101 (Trainer: Mike)',
        type: 'TRAINER_SESSION' as EventType,
        start: new Date(y, m, d + 2, 10, 0), // In 2 days at 10 AM
        end: new Date(y, m, d + 2, 11, 0),
        amount: 45.0,
        isCompleted: false,
    },
];

export default function Schedule() {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={MOCK_EVENTS.map((event) => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                backgroundColor:
                    event.type === 'MAINTENANCE' ? '#fa5252' : '#228be6',
                extendedProps: { ...event },
            }))}
            eventClick={(info) => {
                console.log('Event clicked:', info.event.extendedProps);
            }}
            height='90vh'
        />
    );
}
