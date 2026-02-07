import { AppDataSource } from '../config/database.js';
import { PositionEntity } from '../models/entities/position.entity.js';

const positionRepository = AppDataSource.getRepository(PositionEntity);

export const getPositionsList = async () => {
    try {
        const positions = await positionRepository.find({
            select: ['id', 'positionName'],
            where: { isDeleted: false },
            order: { positionName: 'ASC' }
        });
        return positions;
    } catch (error) {
        throw error;
    }
};

export const getPositionsWithPagination = async (page = 1, limit = 10, search = '') => {
    try {
        const query = positionRepository.createQueryBuilder('position')
            .select(['position.id', 'position.positionName'])
            .where('position.isDeleted = :isDeleted', { isDeleted: false });

        if (search) {
            query.andWhere('position.positionName LIKE :search', { 
                search: `%${search}%` 
            });
        }

        query.orderBy('position.positionName', 'ASC');

        const skip = (page - 1) * limit;
        const [data, total] = await query
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        throw error;
    }
};

export const getPositionById = async (id) => {
    try {
        const position = await positionRepository.findOne({
            select: ['id', 'positionName'],
            where: { id, isDeleted: false }
        });
        return position;
    } catch (error) {
        throw error;
    }
};
