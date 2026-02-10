import { OnboardingCompletionService } from '../services/onboarding-completion.service.js';
import { ResponseUtil } from '../common/utils/response.util.js';

export class OnboardingCompletionController {
    constructor() {
        this.completionService = new OnboardingCompletionService();
    }

    list = async (req, res, next) => {
        try {
            const { skip = 0, take = 10 } = req.query;
            const result = await this.completionService.getAllCompletions(parseInt(skip), parseInt(take));
            return ResponseUtil.successResponse(res, 200, result, 'Completions retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const completion = await this.completionService.getCompletionById(id);
            return ResponseUtil.successResponse(res, 200, completion, 'Completion retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getByProgress = async (req, res, next) => {
        try {
            const { progressId } = req.params;
            const completion = await this.completionService.getCompletionByProgress(progressId);
            return ResponseUtil.successResponse(res, 200, completion, 'Completion retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getByEmployee = async (req, res, next) => {
        try {
            const { employeeId } = req.params;
            const completions = await this.completionService.getCompletionsByEmployee(employeeId);
            return ResponseUtil.successResponse(res, 200, completions, 'Employee completions retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const { progressId, employeeId } = req.body;
            const hrManagerId = req.user?.employeeId;
            const completion = await this.completionService.createCompletion(progressId, employeeId, req.body, hrManagerId);
            return ResponseUtil.successResponse(res, 201, completion, 'Completion record created successfully');
        } catch (error) {
            next(error);
        }
    };

    submitForApproval = async (req, res, next) => {
        try {
            const { id } = req.params;
            const hrManagerId = req.user?.employeeId;
            const completion = await this.completionService.submitForApproval(id, hrManagerId);
            return ResponseUtil.successResponse(res, 200, completion, 'Completion submitted for approval');
        } catch (error) {
            next(error);
        }
    };

    approve = async (req, res, next) => {
        try {
            const { id } = req.params;
            const hrManagerId = req.user?.employeeId;
            const completion = await this.completionService.approveCompletion(id, hrManagerId);
            return ResponseUtil.successResponse(res, 200, completion, 'Completion approved successfully');
        } catch (error) {
            next(error);
        }
    };

    reject = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { comments } = req.body;
            const completion = await this.completionService.rejectCompletion(id, comments);
            return ResponseUtil.successResponse(res, 200, completion, 'Completion rejected successfully');
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const completion = await this.completionService.updateCompletion(id, req.body);
            return ResponseUtil.successResponse(res, 200, completion, 'Completion updated successfully');
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.completionService.deleteCompletion(id);
            return ResponseUtil.successResponse(res, 200, null, 'Completion deleted successfully');
        } catch (error) {
            next(error);
        }
    };

    getApproved = async (req, res, next) => {
        try {
            const completions = await this.completionService.getApprovedCompletions();
            return ResponseUtil.successResponse(res, 200, completions, 'Approved completions retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getStats = async (req, res, next) => {
        try {
            const stats = await this.completionService.getCompletionStats();
            return ResponseUtil.successResponse(res, 200, stats, 'Completion statistics retrieved successfully');
        } catch (error) {
            next(error);
        }
    };
}
