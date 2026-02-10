import { EventEmitter } from 'events';
import { OnboardingNotificationsService } from '../../services/onboarding-notifications.service.js';

class OnboardingEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.notificationsService = new OnboardingNotificationsService();
        this.setupListeners();
    }

    setupListeners() {
        this.on('onboarding:started', (data) => this.handleOnboardingStarted(data));
        this.on('task:assigned', (data) => this.handleTaskAssigned(data));
        this.on('task:completed', (data) => this.handleTaskCompleted(data));
        this.on('task:overdue', (data) => this.handleTaskOverdue(data));
        this.on('progress:updated', (data) => this.handleProgressUpdated(data));
        this.on('onboarding:completed', (data) => this.handleOnboardingCompleted(data));
        this.on('feedback:requested', (data) => this.handleFeedbackRequested(data));
        this.on('completion:pending', (data) => this.handleCompletionPending(data));
        this.on('completion:approved', (data) => this.handleCompletionApproved(data));
        this.on('completion:rejected', (data) => this.handleCompletionRejected(data));
        this.on('document:uploaded', (data) => this.handleDocumentUploaded(data));
        this.on('mentor:assigned', (data) => this.handleMentorAssigned(data));
    }

    async handleOnboardingStarted(data) {
        const { employeeId, employeeName, planName, mentorIds } = data;
        try {
            await this.notificationsService.notifyOnboardingStarted(employeeId, employeeName, planName, mentorIds);
        } catch (error) {
            console.error('Error handling onboarding started event:', error);
        }
    }

    async handleTaskAssigned(data) {
        const { taskTitle, assigneeId, assignedByName, dueDate } = data;
        try {
            await this.notificationsService.notifyTaskAssigned(taskTitle, assigneeId, assignedByName, dueDate);
        } catch (error) {
            console.error('Error handling task assigned event:', error);
        }
    }

    async handleTaskCompleted(data) {
        const { taskTitle, progressManagerIds } = data;
        try {
            await this.notificationsService.notifyTaskCompleted(taskTitle, progressManagerIds);
        } catch (error) {
            console.error('Error handling task completed event:', error);
        }
    }

    async handleTaskOverdue(data) {
        const { taskTitle, assigneeId, managerIds } = data;
        try {
            await this.notificationsService.notifyTaskOverdue(taskTitle, assigneeId, managerIds);
        } catch (error) {
            console.error('Error handling task overdue event:', error);
        }
    }

    async handleProgressUpdated(data) {
        const { employeeName, percentage, managerIds } = data;
        if (percentage % 25 === 0 && percentage > 0) {
            try {
                await this.notificationsService.notifyMilestoneReached(employeeName, percentage, managerIds);
            } catch (error) {
                console.error('Error handling progress updated event:', error);
            }
        }
    }

    async handleOnboardingCompleted(data) {
        const { employeeName, managerIds } = data;
        try {
            await this.notificationsService.notifyOnboardingCompleted(employeeName, managerIds);
        } catch (error) {
            console.error('Error handling onboarding completed event:', error);
        }
    }

    async handleFeedbackRequested(data) {
        const { employeeName, feedbackFromIds } = data;
        try {
            await this.notificationsService.notifyFeedbackRequested(employeeName, feedbackFromIds);
        } catch (error) {
            console.error('Error handling feedback requested event:', error);
        }
    }

    async handleCompletionPending(data) {
        const { employeeName, approverIds } = data;
        try {
            await this.notificationsService.notifyCompletionPending(employeeName, approverIds);
        } catch (error) {
            console.error('Error handling completion pending event:', error);
        }
    }

    async handleCompletionApproved(data) {
        const { employeeName, recipientIds } = data;
        try {
            await this.notificationsService.notifyCompletionApproved(employeeName, recipientIds);
        } catch (error) {
            console.error('Error handling completion approved event:', error);
        }
    }

    async handleCompletionRejected(data) {
        const { employeeName, comments, recipientIds } = data;
        try {
            await this.notificationsService.notifyCompletionRejected(employeeName, comments, recipientIds);
        } catch (error) {
            console.error('Error handling completion rejected event:', error);
        }
    }

    async handleDocumentUploaded(data) {
        const { documentName, progressManagerIds } = data;
        try {
            await this.notificationsService.notifyDocumentUploaded(documentName, progressManagerIds);
        } catch (error) {
            console.error('Error handling document uploaded event:', error);
        }
    }

    async handleMentorAssigned(data) {
        const { employeeName, mentorName, mentorId } = data;
        try {
            await this.notificationsService.notifyMentorAssigned(employeeName, mentorName, mentorId);
        } catch (error) {
            console.error('Error handling mentor assigned event:', error);
        }
    }
}

export const onboardingEventEmitter = new OnboardingEventEmitter();
