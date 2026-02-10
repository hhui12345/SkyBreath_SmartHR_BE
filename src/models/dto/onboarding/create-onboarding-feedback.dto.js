import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateOnboardingFeedbackDto {
    @IsInt({ message: 'Progress ID must be an integer' })
    progressId;

    @IsString({ message: 'Feedback must be a string' })
    feedback;

    @IsOptional()
    @IsString({ message: 'Category must be a string' })
    category;

    @IsOptional()
    @IsInt({ message: 'Rating must be an integer' })
    @Min(1, { message: 'Rating must be at least 1' })
    @Max(5, { message: 'Rating cannot exceed 5' })
    rating;
}
