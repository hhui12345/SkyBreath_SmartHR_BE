import { OnboardingFeedbackRepository } from '../repositories/onboarding-feedback.repository.js';
import { NotFoundException, BadRequestException } from '../common/exceptions/index.js';

export class OnboardingFeedbackService {
    constructor() {
        this.feedbackRepository = new OnboardingFeedbackRepository();
    }

    async getAllFeedback(skip = 0, take = 10) {
        return this.feedbackRepository.findAll(skip, take);
    }

    async getFeedbackById(feedbackId) {
        const feedback = await this.feedbackRepository.findById(feedbackId);
        if (!feedback) {
            throw new NotFoundException(`Feedback with ID ${feedbackId} not found`);
        }
        return feedback;
    }

    async getFeedbackByProgress(progressId) {
        return this.feedbackRepository.findByProgressId(progressId);
    }

    async getFeedbackByCategory(category) {
        return this.feedbackRepository.findByCategory(category);
    }

    async createFeedback(data) {
        if (!data.progressId || !data.feedback) {
            throw new BadRequestException('Progress ID and feedback text are required');
        }

        return this.feedbackRepository.create({
            ...data,
            feedbackDate: new Date(),
        });
    }

    async updateFeedback(feedbackId, data) {
        const feedback = await this.getFeedbackById(feedbackId);
        return this.feedbackRepository.update(feedbackId, {
            ...data,
            updatedAt: new Date(),
        });
    }

    async deleteFeedback(feedbackId) {
        const feedback = await this.getFeedbackById(feedbackId);
        return this.feedbackRepository.delete(feedbackId);
    }

    async deleteFeedbackByProgress(progressId) {
        return this.feedbackRepository.deleteByProgressId(progressId);
    }

    async getFeedbackStats(progressId) {
        const feedback = await this.feedbackRepository.findByProgressId(progressId);
        const averageRating = await this.feedbackRepository.getAverageRatingByProgress(progressId);
        
        const categoryCount = {};
        feedback.forEach(f => {
            if (f.category) {
                categoryCount[f.category] = (categoryCount[f.category] || 0) + 1;
            }
        });

        return {
            totalFeedback: feedback.length,
            averageRating: Math.round(averageRating * 100) / 100,
            ratedFeedback: feedback.filter(f => f.rating).length,
            categories: categoryCount,
        };
    }
}
