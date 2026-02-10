import { AppDataSource } from '../database/data-source.js';
import { OnboardingDocumentEntity } from '../models/entities/onboarding-document.entity.js';

export class OnboardingDocumentsRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(OnboardingDocumentEntity);
    }

    async findAll(skip = 0, take = 10) {
        return this.repository.find({
            relations: ['progress', 'assignment'],
            where: { isDeleted: false },
            skip,
            take,
            order: { uploadDate: 'DESC' }
        });
    }

    async findById(id) {
        return this.repository.findOne({
            where: { id, isDeleted: false },
            relations: ['progress', 'assignment']
        });
    }

    async findByProgressId(progressId) {
        return this.repository.find({
            where: { progressId, isDeleted: false },
            relations: ['assignment'],
            order: { uploadDate: 'DESC' }
        });
    }

    async findByAssignmentId(assignmentId) {
        return this.repository.find({
            where: { assignmentId, isDeleted: false },
            order: { uploadDate: 'DESC' }
        });
    }

    async create(data) {
        const document = this.repository.create(data);
        return this.repository.save(document);
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
}
