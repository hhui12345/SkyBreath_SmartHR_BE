import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { OnboardingProgressEntity } from './onboarding-progress.entity.js';
import { EmployeeEntity } from './employee.entity.js';

@Entity('onboarding_feedback')
export class OnboardingFeedbackEntity extends BaseEntity {
    @Column({ name: 'progress_id', type: 'int' })
    progressId;

    @ManyToOne(() => OnboardingProgressEntity)
    @JoinColumn({ name: 'progress_id' })
    progress;

    @Column({ name: 'feedback_from_id', type: 'int' })
    feedbackFromId;

    @ManyToOne(() => EmployeeEntity)
    @JoinColumn({ name: 'feedback_from_id' })
    feedbackFrom;

    @Column({ type: 'text' })
    feedback;

    @Column({ name: 'feedback_date', type: 'datetime' })
    feedbackDate;

    @Column({ type: 'varchar', nullable: true })
    category;

    @Column({ type: 'int', nullable: true })
    rating;
}
