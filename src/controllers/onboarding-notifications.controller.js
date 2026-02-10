import { OnboardingNotificationsService } from '../services/onboarding-notifications.service.js';
import { ResponseUtil } from '../common/utils/response.util.js';

export class OnboardingNotificationsController {
    constructor() {
        this.notificationsService = new OnboardingNotificationsService();
    }

    getUserNotifications = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const { isRead, skip = 0, take = 20 } = req.query;
            
            const notifications = await this.notificationsService.getUserNotifications(
                userId,
                isRead ? isRead === 'true' : null,
                parseInt(skip),
                parseInt(take)
            );
            
            return ResponseUtil.successResponse(res, 200, notifications, 'User notifications retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getUnreadCount = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const count = await this.notificationsService.getUnreadCount(userId);
            return ResponseUtil.successResponse(res, 200, { unreadCount: count }, 'Unread count retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    markAsRead = async (req, res, next) => {
        try {
            const { notificationRecipientId } = req.params;
            await this.notificationsService.markAsRead(notificationRecipientId);
            return ResponseUtil.successResponse(res, 200, null, 'Notification marked as read');
        } catch (error) {
            next(error);
        }
    };

    markAllAsRead = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            await this.notificationsService.markAllAsRead(userId);
            return ResponseUtil.successResponse(res, 200, null, 'All notifications marked as read');
        } catch (error) {
            next(error);
        }
    };

    deleteNotification = async (req, res, next) => {
        try {
            const { notificationId } = req.params;
            await this.notificationsService.deleteNotification(notificationId);
            return ResponseUtil.successResponse(res, 200, null, 'Notification deleted successfully');
        } catch (error) {
            next(error);
        }
    };
}
