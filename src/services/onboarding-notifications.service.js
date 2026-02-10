import { AppDataSource } from '../database/data-source.js';
import { NotificationEntity } from '../models/entities/notification.entity.js';
import { NotificationRecipientEntity } from '../models/entities/notification-recipient.entity.js';

export class OnboardingNotificationsService {
    constructor() {
        this.notificationRepository = AppDataSource.getRepository(NotificationEntity);
        this.notificationRecipientRepository = AppDataSource.getRepository(NotificationRecipientEntity);
    }

    async sendNotification(title, message, type, recipientIds = []) {
        try {
            const notification = await this.notificationRepository.create({
                title,
                message,
                notificationType: type,
                createdAt: new Date(),
            });
            const savedNotification = await this.notificationRepository.save(notification);

            // Create notification recipients
            if (recipientIds.length > 0) {
                const recipients = recipientIds.map(userId => ({
                    notificationId: savedNotification.id,
                    userId,
                    isRead: false,
                    readAt: null,
                    createdAt: new Date(),
                }));
                await this.notificationRecipientRepository.insert(recipients);
            }

            return savedNotification;
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }

    async notifyOnboardingStarted(employeeId, employeeName, planName, mentorIds = []) {
        const title = 'Onboarding Started';
        const message = `New employee ${employeeName} has started onboarding with plan: ${planName}`;
        return this.sendNotification(title, message, 'ONBOARDING_STARTED', mentorIds);
    }

    async notifyTaskAssigned(taskTitle, assigneeId, assignedByName, dueDate = null) {
        const title = 'New Task Assigned';
        const dueDateStr = dueDate ? ` (Due: ${dueDate})` : '';
        const message = `Task assigned by ${assignedByName}: ${taskTitle}${dueDateStr}`;
        return this.sendNotification(title, message, 'TASK_ASSIGNED', [assigneeId]);
    }

    async notifyTaskCompleted(taskTitle, progressManagerIds = []) {
        const title = 'Task Completed';
        const message = `Task completed: ${taskTitle}`;
        return this.sendNotification(title, message, 'TASK_COMPLETED', progressManagerIds);
    }

    async notifyTaskOverdue(taskTitle, assigneeId, managerIds = []) {
        const title = 'Task Overdue';
        const message = `Overdue task: ${taskTitle}`;
        const recipients = [assigneeId, ...managerIds];
        return this.sendNotification(title, message, 'TASK_OVERDUE', recipients);
    }

    async notifyMilestoneReached(employeeName, percentage, managerIds = []) {
        const title = `Onboarding Progress - ${percentage}% Complete`;
        const message = `${employeeName} has completed ${percentage}% of their onboarding`;
        return this.sendNotification(title, message, 'MILESTONE_REACHED', managerIds);
    }

    async notifyOnboardingCompleted(employeeName, managerIds = []) {
        const title = 'Onboarding Completed';
        const message = `${employeeName} has completed their onboarding process`;
        return this.sendNotification(title, message, 'ONBOARDING_COMPLETED', managerIds);
    }

    async notifyFeedbackRequested(employeeName, feedbackFromIds = []) {
        const title = 'Feedback Requested';
        const message = `Please provide feedback on ${employeeName}'s onboarding`;
        return this.sendNotification(title, message, 'FEEDBACK_REQUESTED', feedbackFromIds);
    }

    async notifyCompletionPending(employeeName, approverIds = []) {
        const title = 'Onboarding Completion Pending Approval';
        const message = `${employeeName}'s onboarding is pending your approval`;
        return this.sendNotification(title, message, 'COMPLETION_PENDING', approverIds);
    }

    async notifyCompletionApproved(employeeName, recipientIds = []) {
        const title = 'Onboarding Approved';
        const message = `${employeeName}'s onboarding has been approved`;
        return this.sendNotification(title, message, 'COMPLETION_APPROVED', recipientIds);
    }

    async notifyCompletionRejected(employeeName, comments, recipientIds = []) {
        const title = 'Onboarding Completion Rejected';
        const message = `${employeeName}'s onboarding was rejected. Reason: ${comments}`;
        return this.sendNotification(title, message, 'COMPLETION_REJECTED', recipientIds);
    }

    async notifyDocumentUploaded(documentName, progressManagerIds = []) {
        const title = 'Document Uploaded';
        const message = `Document uploaded: ${documentName}`;
        return this.sendNotification(title, message, 'DOCUMENT_UPLOADED', progressManagerIds);
    }

    async notifyMentorAssigned(employeeName, mentorName, mentorId) {
        const title = 'Mentor Assigned';
        const message = `You have been assigned as mentor for ${employeeName}`;
        return this.sendNotification(title, message, 'MENTOR_ASSIGNED', [mentorId]);
    }

    async getUserNotifications(userId, isRead = null, skip = 0, take = 20) {
        const query = this.notificationRecipientRepository.createQueryBuilder('nr')
            .leftJoinAndSelect('nr.notification', 'notification')
            .where('nr.userId = :userId', { userId })
            .orderBy('nr.createdAt', 'DESC')
            .skip(skip)
            .take(take);

        if (isRead !== null) {
            query.andWhere('nr.isRead = :isRead', { isRead });
        }

        return query.getMany();
    }

    async markAsRead(notificationRecipientId) {
        return this.notificationRecipientRepository.update(notificationRecipientId, {
            isRead: true,
            readAt: new Date(),
        });
    }

    async markAllAsRead(userId) {
        return this.notificationRecipientRepository.update(
            { userId, isRead: false },
            { isRead: true, readAt: new Date() }
        );
    }

    async getUnreadCount(userId) {
        return this.notificationRecipientRepository.count({
            where: { userId, isRead: false }
        });
    }

    async deleteNotification(notificationId) {
        await this.notificationRepository.delete(notificationId);
        await this.notificationRecipientRepository.delete({ notificationId });
    }
}
