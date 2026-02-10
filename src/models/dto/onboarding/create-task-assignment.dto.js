import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateTaskAssignmentDto {
    @IsInt({ message: 'Progress ID must be an integer' })
    progressId;

    @IsInt({ message: 'Task ID must be an integer' })
    taskId;

    @IsOptional()
    @IsInt({ message: 'Assigned to employee ID must be an integer' })
    assignedToEmployeeId;

    @IsOptional()
    @IsString({ message: 'Due date must be a valid date string' })
    dueDate;

    @IsOptional()
    @IsString({ message: 'Notes must be a string' })
    notes;

    @IsOptional()
    @IsString({ message: 'Priority must be a string' })
    priority = 'NORMAL';
}
