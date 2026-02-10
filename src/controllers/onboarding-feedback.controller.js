import { OnboardingFeedbackService } from '../services/onboarding-feedback.service.js';
import { ResponseUtil } from '../common/utils/response.util.js';

export class OnboardingFeedbackController {
    constructor() {
        this.feedbackService = new OnboardingFeedbackService();
    }

    list = async (req, res, next) => {
        try {
            const { skip = 0, take = 10 } = req.query;
            const result = await this.feedbackService.getAllFeedback(parseInt(skip), parseInt(take));
            return ResponseUtil.successResponse(res, 200, result, 'Feedback retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const feedback = await this.feedbackService.getFeedbackById(id);
            return ResponseUtil.successResponse(res, 200, feedback, 'Feedback retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getByProgress = async (req, res, next) => {
        try {
            const { progressId } = req.params;
            const feedback = await this.feedbackService.getFeedbackByProgress(progressId);
            return ResponseUtil.successResponse(res, 200, feedback, 'Progress feedback retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getByCategory = async (req, res, next) => {
        try {
            const { category } = req.params;
            const feedback = await this.feedbackService.getFeedbackByCategory(category);
            return ResponseUtil.successResponse(res, 200, feedback, 'Feedback by category retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const data = {
                ...req.body,
                feedbackFromId: req.user?.employeeId,
            };
            const feedback = await this.feedbackService.createFeedback(data);
            return ResponseUtil.successResponse(res, 201, feedback, 'Feedback created successfully');
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const feedback = await this.feedbackService.updateFeedback(id, req.body);
            return ResponseUtil.successResponse(res, 200, feedback, 'Feedback updated successfully');
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.feedbackService.deleteFeedback(id);
            return ResponseUtil.successResponse(res, 200, null, 'Feedback deleted successfully');
        } catch (error) {
            next(error);
        }
    };

    getStats = async (req, res, next) => {
        try {
            const { progressId } = req.params;
            const stats = await this.feedbackService.getFeedbackStats(progressId);
            return ResponseUtil.successResponse(res, 200, stats, 'Feedback statistics retrieved successfully');
        } catch (error) {
            next(error);
        }
    };
}
