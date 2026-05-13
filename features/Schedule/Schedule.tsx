'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventType } from '@/app/generated/prisma/enums';
import { useEffect, useState } from 'react';
import { completeEventAction, getEventsAction } from '@/actions/event.action';
import EventMenu from './EventMenu';

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

    const getBackgroundColor = (eventType: EventType, isCompleted: boolean) => {
        let color;

        if (eventType === 'MAINTENANCE') {
            color = '#fa5252';
        } else if (eventType === 'TRAINER_SESSION') {
            color = '#228be6';
        }

        if (isCompleted) {
            color = 'green';
        }

        return color;
    };

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

    const handleCompleteEvent = async (eventId: string) => {
        const { success } = await completeEventAction(eventId);

        if (success) {
            await fetchEvents();
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
                backgroundColor: getBackgroundColor(
                    event.type,
                    event.isCompleted,
                ),
                extendedProps: { ...event },
            }))}
            eventContent={(eventInfo) => {
                const data = eventInfo.event.extendedProps as Event;

                return (
                    <EventMenu
                        event={data}
                        handleCompleteEvent={handleCompleteEvent}
                    />
                );
            }}
            height='90vh'
        />
    );
}
