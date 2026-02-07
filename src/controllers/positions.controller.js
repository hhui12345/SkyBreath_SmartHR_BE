import * as positionsService from '../services/positions.service.js';
import { successResponse } from '../common/responses/success.response.js';
import { errorResponse } from '../common/responses/error.response.js';
import { HTTP_STATUS } from '../common/constants/http-status.js';

export const getPositionsList = async (req, res) => {
    try {
        const positions = await positionsService.getPositionsList();
        return res.status(HTTP_STATUS.OK).json(
            successResponse(positions, 'Get positions list successfully')
        );
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse(error.message)
        );
    }
};

export const getPositionsWithPagination = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const result = await positionsService.getPositionsWithPagination(
            parseInt(page),
            parseInt(limit),
            search
        );
        return res.status(HTTP_STATUS.OK).json(
            successResponse(result, 'Get positions with pagination successfully')
        );
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse(error.message)
        );
    }
};

export const getPositionById = async (req, res) => {
    try {
        const { id } = req.params;
        const position = await positionsService.getPositionById(id);
        return res.status(HTTP_STATUS.OK).json(
            successResponse(position, 'Get position successfully')
        );
    } catch (error) {
        const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(
            errorResponse(error.message)
        );
    }
};
