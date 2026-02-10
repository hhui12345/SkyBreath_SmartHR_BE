import { OnboardingDocumentsService } from '../services/onboarding-documents.service.js';
import { ResponseUtil } from '../common/utils/response.util.js';

export class OnboardingDocumentsController {
    constructor() {
        this.documentsService = new OnboardingDocumentsService();
    }

    list = async (req, res, next) => {
        try {
            const { skip = 0, take = 10 } = req.query;
            const result = await this.documentsService.getAllDocuments(parseInt(skip), parseInt(take));
            return ResponseUtil.successResponse(res, 200, result, 'Documents retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const document = await this.documentsService.getDocumentById(id);
            return ResponseUtil.successResponse(res, 200, document, 'Document retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getByProgress = async (req, res, next) => {
        try {
            const { progressId } = req.params;
            const documents = await this.documentsService.getDocumentsByProgress(progressId);
            return ResponseUtil.successResponse(res, 200, documents, 'Progress documents retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getByAssignment = async (req, res, next) => {
        try {
            const { assignmentId } = req.params;
            const documents = await this.documentsService.getDocumentsByAssignment(assignmentId);
            return ResponseUtil.successResponse(res, 200, documents, 'Assignment documents retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    upload = async (req, res, next) => {
        try {
            const document = await this.documentsService.uploadDocument(req.body);
            return ResponseUtil.successResponse(res, 201, document, 'Document uploaded successfully');
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const document = await this.documentsService.updateDocument(id, req.body);
            return ResponseUtil.successResponse(res, 200, document, 'Document updated successfully');
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.documentsService.deleteDocument(id);
            return ResponseUtil.successResponse(res, 200, null, 'Document deleted successfully');
        } catch (error) {
            next(error);
        }
    };

    getStats = async (req, res, next) => {
        try {
            const { progressId } = req.params;
            const stats = await this.documentsService.getDocumentStats(progressId);
            return ResponseUtil.successResponse(res, 200, stats, 'Document statistics retrieved successfully');
        } catch (error) {
            next(error);
        }
    };
}
