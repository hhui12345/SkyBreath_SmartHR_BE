import { AppDataSource } from '../database/data-source.js';
import { OnboardingCompletionEntity } from '../models/entities/onboarding-completion.entity.js';

export class OnboardingCompletionRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(OnboardingCompletionEntity);
    }

    async findAll(skip = 0, take = 10) {
        return this.repository.find({
            relations: ['progress', 'employee', 'hrManager'],
            where: { isDeleted: false },
            skip,
            take,
            order: { completionDate: 'DESC' }
        });
    }

    async findById(id) {
        return this.repository.findOne({
            where: { id, isDeleted: false },
            relations: ['progress', 'employee', 'hrManager']
        });
    }

    async findByProgressId(progressId) {
        return this.repository.findOne({
            where: { progressId, isDeleted: false },
            relations: ['progress', 'employee', 'hrManager']
        });
    }

    async findByEmployeeId(employeeId) {
        return this.repository.find({
            where: { employeeId, isDeleted: false },
            relations: ['progress', 'hrManager'],
            order: { completionDate: 'DESC' }
        });
    }

    async findApproved() {
        return this.repository.find({
            where: { isApproved: true, isDeleted: false },
            relations: ['employee', 'hrManager'],
            order: { approvedDate: 'DESC' }
        });
    }

    async create(data) {
        const completion = this.repository.create(data);
        return this.repository.save(completion);
    }

    async update(id, data) {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    async delete(id) {
        return this.repository.update(id, { isDeleted: true });
    }

    async count() {
        return this.repository.count({ where: { isDeleted: false } });
    }

    async countApproved() {
        return this.repository.count({ 
            where: { isApproved: true, isDeleted: false } 
        });
    }
}
