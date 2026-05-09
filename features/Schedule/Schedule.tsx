'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventType } from '@/app/generated/prisma/enums';
import { useEffect, useState } from 'react';
import { getEventsAction } from '@/actions/event.action';

export interface Event {
    id: string;
    title: string;
    type: EventType;
    start: Date;
    end: Date;
    amount: number;
    isCompleted: boolean;
    equipmentId: string | null;
    equipment: {
        name: string;
        category: string;
    } | null;
}

export default function Schedule() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const events = await getEventsAction();

                if (events.data && events.success) {
                    setEvents(events.data);
                }
            } catch (error) {
                console.error('Failed to get events.');
            }
        }

        fetchEvents();
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events.map((event) => ({
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
