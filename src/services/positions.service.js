import * as positionsRepository from '../repositories/positions.repository.js';
import { NotFoundException } from '../common/exceptions/not-found.exception.js';

export const getPositionsList = async () => {
    try {
        const positions = await positionsRepository.getPositionsList();
        return positions;
    } catch (error) {
        throw error;
    }
};

export const getPositionsWithPagination = async (page = 1, limit = 10, search = '') => {
    try {
        const result = await positionsRepository.getPositionsWithPagination(page, limit, search);
        return result;
    } catch (error) {
        throw error;
    }
};

export const getPositionById = async (id) => {
    try {
        const position = await positionsRepository.getPositionById(id);
        if (!position) {
            throw new NotFoundException('Position not found');
        }
        return position;
    } catch (error) {
        throw error;
    }
};
