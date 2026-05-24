'use server';

import { AppointmentFormValues } from '@/features/MyClients/CreateAppointmentModal';
import { createSafeAction } from '@/helpers/createSafeAction';
import {
    completeEvent,
    createAppointmentEvent,
    getEvents,
} from '@/services/event.service';

export const getEventsAction = async () =>
    await createSafeAction(getEvents, 'Could not fetch events.');

export const completeEventAction = async (eventId: string) =>
    await createSafeAction(
        () => completeEvent(eventId),
        'Could not complete event.',
    );

export const createAppointmentEventAction = async (
    trainerId: string,
    memberId: string,
    memberName: string,
    data: AppointmentFormValues,
) =>
    await createSafeAction(
        () => createAppointmentEvent(trainerId, memberId, memberName, data),
        'Could not create an appointment.',
    );
