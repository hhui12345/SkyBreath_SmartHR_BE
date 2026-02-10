import { OnboardingDocumentsRepository } from '../repositories/onboarding-documents.repository.js';
import { NotFoundException, BadRequestException } from '../common/exceptions/index.js';

export class OnboardingDocumentsService {
    constructor() {
        this.documentsRepository = new OnboardingDocumentsRepository();
    }

    async getAllDocuments(skip = 0, take = 10) {
        return this.documentsRepository.findAll(skip, take);
    }

    async getDocumentById(documentId) {
        const document = await this.documentsRepository.findById(documentId);
        if (!document) {
            throw new NotFoundException(`Document with ID ${documentId} not found`);
        }
        return document;
    }

    async getDocumentsByProgress(progressId) {
        return this.documentsRepository.findByProgressId(progressId);
    }

    async getDocumentsByAssignment(assignmentId) {
        return this.documentsRepository.findByAssignmentId(assignmentId);
    }

    async uploadDocument(data) {
        if (!data.documentName || !data.documentPath) {
            throw new BadRequestException('Document name and path are required');
        }

        return this.documentsRepository.create({
            ...data,
            uploadDate: new Date(),
            status: 'ACTIVE',
        });
    }

    async updateDocument(documentId, data) {
        const document = await this.getDocumentById(documentId);
        return this.documentsRepository.update(documentId, {
            ...data,
            updatedAt: new Date(),
        });
    }

    async deleteDocument(documentId) {
        const document = await this.getDocumentById(documentId);
        return this.documentsRepository.delete(documentId);
    }

    async deleteDocumentsByProgress(progressId) {
        return this.documentsRepository.deleteByProgressId(progressId);
    }

    async getDocumentStats(progressId) {
        const documents = await this.documentsRepository.findByProgressId(progressId);
        const totalSize = documents.reduce((sum, doc) => sum + (doc.fileSize || 0), 0);

        return {
            totalDocuments: documents.length,
            totalSize,
            averageSize: documents.length > 0 ? Math.round(totalSize / documents.length) : 0,
            documentTypes: [...new Set(documents.map(d => d.documentType))],
        };
    }
}
