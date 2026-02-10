import { Router } from 'express';
import { OnboardingPlansController } from '../controllers/onboarding-plans.controller.js';
import { OnboardingProgressController } from '../controllers/onboarding-progress.controller.js';
import { TaskAssignmentsController } from '../controllers/task-assignments.controller.js';
import { OnboardingDocumentsController } from '../controllers/onboarding-documents.controller.js';
import { OnboardingFeedbackController } from '../controllers/onboarding-feedback.controller.js';
import { OnboardingCompletionController } from '../controllers/onboarding-completion.controller.js';
import { OnboardingNotificationsController } from '../controllers/onboarding-notifications.controller.js';
import { authMiddleware } from '../common/middleware/auth.middleware.js';
import { rolesMiddleware } from '../common/middleware/roles.middleware.js';

const router = Router();

// Controllers
const plansController = new OnboardingPlansController();
const progressController = new OnboardingProgressController();
const assignmentsController = new TaskAssignmentsController();
const documentsController = new OnboardingDocumentsController();
const feedbackController = new OnboardingFeedbackController();
const completionController = new OnboardingCompletionController();
const notificationsController = new OnboardingNotificationsController();

// Onboarding Plans Routes
router.get('/plans', authMiddleware, plansController.list);
router.get('/plans/:id', authMiddleware, plansController.getById);
router.post('/plans', authMiddleware, rolesMiddleware(['HR_MANAGER']), plansController.create);
router.put('/plans/:id', authMiddleware, rolesMiddleware(['HR_MANAGER']), plansController.update);
router.delete('/plans/:id', authMiddleware, rolesMiddleware(['HR_MANAGER']), plansController.delete);
router.get('/plans/:id/stats', authMiddleware, plansController.getStats);
router.get('/plans/department/:departmentId', authMiddleware, plansController.getByDepartment);
router.get('/plans-templates/list', authMiddleware, plansController.getTemplates);
router.post('/plans/:id/duplicate', authMiddleware, rolesMiddleware(['HR_MANAGER']), plansController.duplicate);

// Onboarding Progress Routes
router.get('/progress', authMiddleware, progressController.list);
router.get('/progress/:id', authMiddleware, progressController.getById);
router.get('/progress/stats/all', authMiddleware, progressController.getStats);
router.post('/progress/start', authMiddleware, rolesMiddleware(['HR_MANAGER']), progressController.startOnboarding);
router.put('/progress/:id', authMiddleware, progressController.update);
router.put('/progress/:id/complete', authMiddleware, rolesMiddleware(['HR_MANAGER']), progressController.complete);
router.put('/progress/:id/pause', authMiddleware, rolesMiddleware(['HR_MANAGER']), progressController.pause);
router.put('/progress/:id/resume', authMiddleware, rolesMiddleware(['HR_MANAGER']), progressController.resume);
router.get('/progress/employee/:employeeId', authMiddleware, progressController.getByEmployee);
router.get('/progress/department/:departmentId', authMiddleware, progressController.getByDepartment);

// Task Assignments Routes
router.get('/assignments', authMiddleware, assignmentsController.list);
router.get('/assignments/:id', authMiddleware, assignmentsController.getById);
router.get('/assignments/stats/all', authMiddleware, assignmentsController.getStats);
router.post('/assignments', authMiddleware, rolesMiddleware(['HR_MANAGER', 'DEPARTMENT_MANAGER']), assignmentsController.create);
router.put('/assignments/:id', authMiddleware, rolesMiddleware(['HR_MANAGER', 'DEPARTMENT_MANAGER']), assignmentsController.update);
router.put('/assignments/:id/complete', authMiddleware, assignmentsController.complete);
router.put('/assignments/:id/start', authMiddleware, assignmentsController.start);
router.put('/assignments/:id/reassign', authMiddleware, rolesMiddleware(['HR_MANAGER', 'DEPARTMENT_MANAGER']), assignmentsController.reassign);
router.delete('/assignments/:id', authMiddleware, rolesMiddleware(['HR_MANAGER']), assignmentsController.delete);
router.get('/assignments/progress/:progressId', authMiddleware, assignmentsController.getByProgress);
router.get('/assignments/employee/:employeeId', authMiddleware, assignmentsController.getByEmployee);
router.get('/assignments/status/:status', authMiddleware, assignmentsController.getByStatus);
router.get('/assignments/overdue', authMiddleware, assignmentsController.getOverdue);

// Documents Routes
router.get('/documents', authMiddleware, documentsController.list);
router.get('/documents/:id', authMiddleware, documentsController.getById);
router.post('/documents', authMiddleware, documentsController.upload);
router.put('/documents/:id', authMiddleware, documentsController.update);
router.delete('/documents/:id', authMiddleware, documentsController.delete);
router.get('/documents/progress/:progressId', authMiddleware, documentsController.getByProgress);
router.get('/documents/assignment/:assignmentId', authMiddleware, documentsController.getByAssignment);
router.get('/documents/progress/:progressId/stats', authMiddleware, documentsController.getStats);

// Feedback Routes
router.get('/feedback', authMiddleware, feedbackController.list);
router.get('/feedback/:id', authMiddleware, feedbackController.getById);
router.post('/feedback', authMiddleware, feedbackController.create);
router.put('/feedback/:id', authMiddleware, feedbackController.update);
router.delete('/feedback/:id', authMiddleware, rolesMiddleware(['HR_MANAGER']), feedbackController.delete);
router.get('/feedback/progress/:progressId', authMiddleware, feedbackController.getByProgress);
router.get('/feedback/category/:category', authMiddleware, feedbackController.getByCategory);
router.get('/feedback/progress/:progressId/stats', authMiddleware, feedbackController.getStats);

// Completion Routes
router.get('/completion', authMiddleware, completionController.list);
router.get('/completion/:id', authMiddleware, completionController.getById);
router.get('/completion/stats/all', authMiddleware, completionController.getStats);
router.post('/completion', authMiddleware, rolesMiddleware(['HR_MANAGER']), completionController.create);
router.put('/completion/:id', authMiddleware, rolesMiddleware(['HR_MANAGER']), completionController.update);
router.put('/completion/:id/submit', authMiddleware, completionController.submitForApproval);
router.put('/completion/:id/approve', authMiddleware, rolesMiddleware(['HR_MANAGER']), completionController.approve);
router.put('/completion/:id/reject', authMiddleware, rolesMiddleware(['HR_MANAGER']), completionController.reject);
router.delete('/completion/:id', authMiddleware, rolesMiddleware(['HR_MANAGER']), completionController.delete);
router.get('/completion/progress/:progressId', authMiddleware, completionController.getByProgress);
router.get('/completion/employee/:employeeId', authMiddleware, completionController.getByEmployee);
router.get('/completion/approved', authMiddleware, completionController.getApproved);

// Notifications Routes
router.get('/notifications/user', authMiddleware, notificationsController.getUserNotifications);
router.get('/notifications/unread-count', authMiddleware, notificationsController.getUnreadCount);
router.put('/notifications/:notificationRecipientId/read', authMiddleware, notificationsController.markAsRead);
router.put('/notifications/read-all', authMiddleware, notificationsController.markAllAsRead);
router.delete('/notifications/:notificationId', authMiddleware, notificationsController.deleteNotification);

export const onboardingRoutes = router;
