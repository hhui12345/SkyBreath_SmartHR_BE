import { OnboardingCompletionRepository } from '../repositories/onboarding-completion.repository.js';
import { OnboardingProgressService } from './onboarding-progress.service.js';
import { NotFoundException, BadRequestException } from '../common/exceptions/index.js';

export class OnboardingCompletionService {
    constructor() {
        this.completionRepository = new OnboardingCompletionRepository();
        this.progressService = new OnboardingProgressService();
    }

    async getAllCompletions(skip = 0, take = 10) {
        return this.completionRepository.findAll(skip, take);
    }

    async getCompletionById(completionId) {
        const completion = await this.completionRepository.findById(completionId);
        if (!completion) {
            throw new NotFoundException(`Completion record with ID ${completionId} not found`);
        }
        return completion;
    }

    async getCompletionByProgress(progressId) {
        const completion = await this.completionRepository.findByProgressId(progressId);
        if (!completion) {
            throw new NotFoundException(`No completion record found for progress ${progressId}`);
        }
        return completion;
    }

    async getCompletionsByEmployee(employeeId) {
        return this.completionRepository.findByEmployeeId(employeeId);
    }

    async createCompletion(progressId, employeeId, data, hrManagerId = null) {
        const existingCompletion = await this.completionRepository.findByProgressId(progressId);
        if (existingCompletion) {
            throw new BadRequestException('Completion record already exists for this progress');
        }

        const completion = await this.completionRepository.create({
            progressId,
            employeeId,
            ...data,
            completionDate: new Date(),
            hrManagerId,
            isApproved: false,
        });

        // Update progress status to COMPLETED
        await this.progressService.completeOnboarding(progressId);

        return completion;
    }

    async submitForApproval(completionId, hrManagerId) {
        const completion = await this.getCompletionById(completionId);
        
        return this.completionRepository.update(completionId, {
            hrManagerId,
            updatedAt: new Date(),
        });
    }

    async approveCompletion(completionId, hrManagerId) {
        const completion = await this.getCompletionById(completionId);
        
        if (completion.isApproved) {
            throw new BadRequestException('This completion has already been approved');
        }

        return this.completionRepository.update(completionId, {
            isApproved: true,
            approvedDate: new Date(),
            hrManagerId,
            updatedAt: new Date(),
        });
    }

    async rejectCompletion(completionId, comments) {
        const completion = await this.getCompletionById(completionId);
        
        // Revert progress status back to IN_PROGRESS
        await this.progressService.resumeOnboarding(completion.progressId);

        return this.completionRepository.update(completionId, {
            finalComments: comments || completion.finalComments,
            updatedAt: new Date(),
        });
    }

    async updateCompletion(completionId, data) {
        const completion = await this.getCompletionById(completionId);
        return this.completionRepository.update(completionId, {
            ...data,
            updatedAt: new Date(),
        });
    }

    async deleteCompletion(completionId) {
        const completion = await this.getCompletionById(completionId);
        return this.completionRepository.delete(completionId);
    }

    async getApprovedCompletions() {
        return this.completionRepository.findApproved();
    }

    async getCompletionStats() {
        const [totalCompletions, approvedCompletions] = await Promise.all([
            this.completionRepository.count(),
            this.completionRepository.countApproved(),
        ]);

        const approvalRate = totalCompletions > 0 ? Math.round((approvedCompletions / totalCompletions) * 100) : 0;

        return {
            totalCompletions,
            approvedCompletions,
            pendingApproval: totalCompletions - approvedCompletions,
            approvalRate,
        };
    }
}
