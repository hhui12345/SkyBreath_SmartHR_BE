import { AppDataSource } from '../database/data-source.js';
import { OnboardingFeedbackEntity } from '../models/entities/onboarding-feedback.entity.js';

export class OnboardingFeedbackRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(OnboardingFeedbackEntity);
    }

    async findAll(skip = 0, take = 10) {
        return this.repository.find({
            relations: ['progress', 'feedbackFrom'],
            where: { isDeleted: false },
            skip,
            take,
            order: { feedbackDate: 'DESC' }
        });
    }

    async findById(id) {
        return this.repository.findOne({
            where: { id, isDeleted: false },
            relations: ['progress', 'feedbackFrom']
        });
    }

    async findByProgressId(progressId) {
        return this.repository.find({
            where: { progressId, isDeleted: false },
            relations: ['feedbackFrom'],
            order: { feedbackDate: 'DESC' }
        });
    }

    async findByCategory(category) {
        return this.repository.find({
            where: { category, isDeleted: false },
            relations: ['progress', 'feedbackFrom'],
            order: { feedbackDate: 'DESC' }
        });
    }

    async create(data) {
        const feedback = this.repository.create(data);
        return this.repository.save(feedback);
    }

    async update(id, data) {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    async delete(id) {
        return this.repository.update(id, { isDeleted: true });
    }

    async deleteByProgressId(progressId) {
        return this.repository.update({ progressId }, { isDeleted: true });
    }

    async getAverageRatingByProgress(progressId) {
        const result = await this.repository
            .createQueryBuilder('feedback')
            .select('AVG(feedback.rating)', 'averageRating')
            .where('feedback.progressId = :progressId', { progressId })
            .andWhere('feedback.rating IS NOT NULL')
            .andWhere('feedback.isDeleted = :isDeleted', { isDeleted: false })
            .getRawOne();
        return result.averageRating || 0;
    }
}
