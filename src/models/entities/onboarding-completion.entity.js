import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { OnboardingProgressEntity } from './onboarding-progress.entity.js';
import { EmployeeEntity } from './employee.entity.js';

@Entity('onboarding_completion')
export class OnboardingCompletionEntity extends BaseEntity {
    @Column({ name: 'progress_id', type: 'int' })
    progressId;

    @OneToOne(() => OnboardingProgressEntity)
    @JoinColumn({ name: 'progress_id' })
    progress;

    @Column({ name: 'employee_id', type: 'int' })
    employeeId;

    @ManyToOne(() => EmployeeEntity)
    @JoinColumn({ name: 'employee_id' })
    employee;

    @Column({ name: 'completion_date', type: 'datetime' })
    completionDate;

    @Column({ type: 'text', nullable: true })
    finalComments;

    @Column({ name: 'hr_manager_id', nullable: true, type: 'int' })
    hrManagerId;

    @ManyToOne(() => EmployeeEntity)
    @JoinColumn({ name: 'hr_manager_id' })
    hrManager;

    @Column({ name: 'is_approved', type: 'boolean', default: false })
    isApproved;

    @Column({ name: 'approved_date', type: 'datetime', nullable: true })
    approvedDate;

    @Column({ name: 'overall_rating', type: 'decimal', precision: 3, scale: 2, nullable: true })
    overallRating;
}
