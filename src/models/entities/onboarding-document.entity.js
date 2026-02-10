import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { OnboardingProgressEntity } from './onboarding-progress.entity.js';
import { TaskAssignmentEntity } from './task-assignment.entity.js';

@Entity('onboarding_documents')
export class OnboardingDocumentEntity extends BaseEntity {
    @Column({ name: 'progress_id', type: 'int' })
    progressId;

    @ManyToOne(() => OnboardingProgressEntity)
    @JoinColumn({ name: 'progress_id' })
    progress;

    @Column({ name: 'assignment_id', nullable: true, type: 'int' })
    assignmentId;

    @ManyToOne(() => TaskAssignmentEntity)
    @JoinColumn({ name: 'assignment_id' })
    assignment;

    @Column({ name: 'document_name', type: 'varchar' })
    documentName;

    @Column({ name: 'document_path', type: 'varchar' })
    documentPath;

    @Column({ name: 'document_type', type: 'varchar', nullable: true })
    documentType;

    @Column({ name: 'file_size', type: 'bigint', nullable: true })
    fileSize;

    @Column({ name: 'upload_date', type: 'datetime' })
    uploadDate;

    @Column({ type: 'varchar', default: 'ACTIVE' })
    status;
}
